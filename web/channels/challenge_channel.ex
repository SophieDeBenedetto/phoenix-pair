defmodule PhoenixPair.ChallengeChannel do
  use PhoenixPair.Web, :channel
  alias PhoenixPair.{Challenge, User}

  def join("challenges:" <> challenge_id, _params, socket) do
    challenge = Repo.get(Challenge, challenge_id)

    {:ok, %{challenge: challenge}, assign(socket, :challenge, challenge)}
  end

  def handle_in("user:join", %{user_id: user_id, users: users}, socket) do 
    challenge = socket.assigns.challenge
    user = Repo.get(User, id: user_id)
    users = [users | user]
    broadcast! socket, "user:joined", %{users: users}
    {:noreply, socket}
  end
end