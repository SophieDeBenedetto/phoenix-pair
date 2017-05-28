require IEx;
defmodule PhoenixPair.ChallengeChannel do
  use PhoenixPair.Web, :channel
  alias PhoenixPair.{Challenge, User}

  def join("challenges:" <> challenge_id, _params, socket) do
    challenge = Repo.get(Challenge, challenge_id)

    {:ok, %{challenge: challenge}, assign(socket, :challenge, challenge)}
  end

  def handle_in("user:join", %{"user_id" => user_id, "users" => users}, socket) do
    challenge = socket.assigns.challenge
    user = Repo.get(User, user_id)
    user_json = [user | users]
      |> collect_user_json

    broadcast! socket, "user:joined", %{users: user_json}
    {:noreply, socket}
  end

  defp collect_user_json(users) do
    Enum.map(users, &encode_user(&1))
  end

  def encode_user(user) do
    case Poison.encode(user) do 
      {:ok, user} ->
        user
      _ ->
        :error
    end 
  end
end