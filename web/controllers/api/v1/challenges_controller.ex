defmodule PhoenixPair.ChallengesController do 
  use PhoenixPair.Web, :controller

  plug Guardian.Plug.EnsureAuthenticated, handler: PhoenixPair.SessionController

  alias PhoenixPair.{Repo, User}

  def index(conn, _params) do
    challenges = Challenge.preload_all
    |> Repo.all

    render(conn, "index.json", challenges: challenges)
  end
end