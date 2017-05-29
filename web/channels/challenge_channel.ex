require IEx;
defmodule PhoenixPair.ChallengeChannel do
  use PhoenixPair.Web, :channel
  alias PhoenixPair.{Challenge, User}
  alias PhoenixPair.ChallengeChannel.Monitor

  def join("challenges:" <> challenge_id, _params, socket) do
    challenge = Repo.get(Challenge, challenge_id)
    user = socket.assigns.current_user
    participant_ids = Monitor.participant_joined(challenge_id, user.id)
    send(self, {:after_join, participant_ids})

    {:ok, %{challenge: challenge}, assign(socket, :challenge, challenge)}
  end

  def handle_info({:after_join, participant_ids}, socket) do
    users = collect_user_json(participant_ids)
    broadcast! socket, "user:joined", %{users: users}
    {:noreply, socket}
  end

  def terminate(_reason, socket) do
    challenge_id = socket.assigns.challenge.id
    user_id = socket.assigns.current_user.id
    broadcast! socket, "user:left", %{users: Monitor.user_left(challenge_id, user_id)}

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
