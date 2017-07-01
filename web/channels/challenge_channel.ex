require IEx;
defmodule PhoenixPair.ChallengeChannel do
  use PhoenixPair.Web, :channel
  alias PhoenixPair.{Challenge, User}
  alias PhoenixPair.ChallengeChannel.Monitor

  def join("challenges:" <> challenge_id, _params, socket) do
    challenge = Repo.get(Challenge, challenge_id)
    user = socket.assigns.current_user
    challenge_state = Monitor.participant_joined(challenge_id, user.id)
    send(self, {:after_join, challenge_state})

    {:ok, %{challenge: challenge}, assign(socket, :challenge, challenge)}
  end

  def handle_info({:after_join, challenge_state}, socket) do
    users = collect_user_json(challenge_state[:participants])
    broadcast! socket, "user:joined", %{users: users, language: challenge_state[:language], user: challenge_state[:user]}
    {:noreply, socket}
  end

  def handle_in("response:update", %{"response" => response, "user" => user}, socket) do
    challenge = socket.assigns.challenge
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
    challenge = socket.assigns.challenge
    %{language: language} = Monitor.language_update(challenge.id, response)
    broadcast! socket, "language:updated", %{language: language}
    {:noreply, socket}
  end

  def terminate(_reason, socket) do
    challenge_id = socket.assigns.challenge.id
    user_id = socket.assigns.current_user.id
    %{participants: participant_ids} = Monitor.participant_left(challenge_id, user_id)
    users = collect_user_json(participant_ids)
    broadcast! socket, "user:left", %{users: users}
    :ok
  end

  defp collect_user_json(user_ids) do
    Enum.map(user_ids, &encode_user(&1))
  end

  defp encode_user(user_id) do
    user = Repo.get(User, user_id)
    case Poison.encode(user) do
      {:ok, user} ->
        user
      _ ->
        :error
    end
  end
end
