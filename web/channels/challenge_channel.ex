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
    ChallengePresence.track_user_join(socket, current_user(socket))
    push socket, "presence_state", ChallengePresence.list(socket)
    
    Monitor.participant_joined(challenge.id)
    broadcast! socket, "user:joined", %{challenge_state: challenge_state(challenge.id)}
    
    {:noreply, socket}
  end


  def handle_in("response:update", %{"response" => response, "user_id" => user_id}, socket) do
    case Challenge.update(current_challenge(socket), response) do
      {:ok, challenge}    
         ->
        Monitor.current_participant_typing(challenge.id, user_id)
        broadcast! socket, "response:updated", %{challenge: challenge, challenge_state: challenge_state(challenge.id)}
        {:noreply, socket}
      {:error, changeset} ->
        {:reply, {:error, %{error: "Error updating challenge"}}, socket}
    end
  end

  def handle_in("language:update", %{"response" => response}, socket) do 
    Monitor.language_update(current_challenge(socket).id, response)
    broadcast! socket, "language:updated", challenge_state(current_challenge(socket).id)
    {:noreply, socket}
  end

  def handle_in("chat:create_message", %{"message" => message}, socket) do
    case Message.create(message, current_challenge(socket).chat.id, current_user(socket).id) do 
      {:ok, message} -> 
        challenge = get_challenge(current_challenge(socket).id)
        broadcast! socket, "chat:message_created", %{challenge: challenge}
        {:noreply, socket}
      {:error, message} ->
        {:reply, {:error, %{error: "Error creating message for chat #{current_challenge(socket).chat.id}"}}, socket}
    end
  end

  def handle_in("current_participant_typing:remove", _, socket) do 
    Monitor.current_participant_typing(current_challenge(socket).id, nil)
    broadcast! socket, "current_participant_typing:removed", challenge_state(current_challenge(socket).id)
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

  def challenge_state(challenge_id) do
    Monitor.get_challenge_state(challenge_id) 
  end
end
