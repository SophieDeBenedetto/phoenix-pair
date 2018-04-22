defmodule PhoenixPair.ChallengesController do 
  use PhoenixPair.Web, :controller

  plug Guardian.Plug.EnsureAuthenticated, handler: PhoenixPair.SessionsController

  alias PhoenixPair.{Repo, User, Challenge}

  def index(conn, _params) do
    challenges = Repo.all(Challenge) |> Repo.preload([{:chat, [{:messages, [:user]}]}])
    render(conn, "index.json", challenges: challenges)
  end
end