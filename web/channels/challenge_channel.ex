require IEx;
defmodule PhoenixPair.ChallengeChannel do
  use PhoenixPair.Web, :channel
  alias PhoenixPair.{Challenge, User, Message, Chat}
  alias PhoenixPair.ChallengePresence


  def join("challenges:" <> challenge_id, _params, socket) do
    challenge = get_challenge(challenge_id)
    send(self, :after_join)
    
    {:ok, %{challenge: challenge}, assign(socket, :challenge, challenge)}
  end

  def handle_info(:after_join, socket) do
    {:ok, _ } = ChallengePresence.track(socket, current_user(socket).id, %{
      typing: false, 
      first_name: current_user(socket).first_name, 
      user_id: current_user(socket).id
    })
    push socket, "presence_state", ChallengePresence.list(socket)
    {:noreply, socket}
  end


  def handle_in("response:update", %{"response" => response, "user" => user}, socket) do
    challenge = current_challenge(socket)
    |> Ecto.Changeset.change(%{response: response})
    
    case Repo.update challenge do
      {:ok, struct}       ->
        challenge_state = Monitor.current_participant_typing(struct.id, user)
        broadcast! socket, "response:updated", %{challenge: struct, user: challenge_state[:user]}
        {:noreply, socket}
      {:error, changeset} ->
        {:reply, {:error, %{error: "Error updating challenge"}}, socket}
    end
  end

  def handle_in("language:update", %{"response" => response}, socket) do 
    # %{language: language} = Monitor.language_update(current_challenge(socket).id, response)
    # broadcast! socket, "language:updated", %{language: language}
    # {:noreply, socket}
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

  # def terminate(_reason, socket) do
  #   # %{participants: participant_ids} = Monitor.participant_left(current_challenge(socket).id, current_user(socket).id)
  #   # users = collect_user_json(participant_ids)
  #   # broadcast! socket, "user:left", %{users: users}
  #   # :ok
  # end



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
