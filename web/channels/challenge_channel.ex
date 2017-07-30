require IEx;
defmodule PhoenixPair.ChallengeChannel do
  use PhoenixPair.Web, :channel
  alias PhoenixPair.{Challenge, User, Message, Chat}
  alias PhoenixPair.ChallengeChannel.{Monitor}
  alias PhoenixPair.ChallengePresence


  def join("challenges:" <> challenge_id, _params, socket) do
    challenge = get_challenge(challenge_id)
    send(self, {:after_join, challenge})

    {:ok, %{challenge: challenge}, assign(socket, :challenge, challenge)}
  end

  def handle_info({:after_join, challenge}, socket) do
    {:ok, _ } = ChallengePresence.track(socket, current_user(socket).id, %{
      typing: false,
      first_name: current_user(socket).first_name, 
      user_id: current_user(socket).id
    })
    push socket, "presence_state", ChallengePresence.list(socket)
    Monitor.participant_joined(challenge.id)
    broadcast! socket, "user:joined", %{challenge_state: Monitor.get_challenge_state(challenge.id)}
    {:noreply, socket}
  end


  def handle_in("response:update", %{"response" => response, "user_id" => user_id}, socket) do
    challenge = current_challenge(socket)
    |> Ecto.Changeset.change(%{response: response})
    
    case Repo.update challenge do
      {:ok, struct}    
         ->
        Monitor.current_participant_typing(struct.id, user_id)
        broadcast! socket, "response:updated", %{challenge: struct, challenge_state: Monitor.get_challenge_state(current_challenge(socket).id)}
        {:noreply, socket}
      {:error, changeset} ->
        {:reply, {:error, %{error: "Error updating challenge"}}, socket}
    end
  end

  def handle_in("language:update", %{"response" => response}, socket) do 
    Monitor.language_update(current_challenge(socket).id, response)
    broadcast! socket, "language:updated", Monitor.get_challenge_state(current_challenge(socket).id)
    {:noreply, socket}
  end

  def handle_in("chat:create_message", %{"message" => message}, socket) do
    chat_id = current_challenge(socket).chat.id
    user_id = current_user(socket).id
    changeset = Message.changeset(%Message{}, %{user_id: user_id, chat_id: chat_id, content: message})

    case Repo.insert changeset do 
      {:ok, message} -> 
        challenge = get_challenge(current_challenge(socket).id)
        broadcast! socket, "chat:message_created", %{challenge: challenge}
        {:noreply, socket}
      {:error, message} ->
        {:reply, {:error, %{error: "Error creating message for chat #{chat_id}"}}, socket}
    end
  end

  def handle_in("current_participant_typing:remove", _, socket) do 
    Monitor.current_participant_typing(current_challenge(socket).id, nil)
    broadcast! socket, "current_participant_typing:removed", Monitor.get_challenge_state(current_challenge(socket).id)
    {:noreply, socket}
  end

  def get_challenge(id) do 
    Repo.get(Challenge, id)
    |> Repo.preload([{:chat, [{:messages, [:user]}]}])
  end

  def current_user(socket) do 
    socket.assigns.current_user
  end

  def current_challenge(socket) do 
    socket.assigns.challenge
  end
end
