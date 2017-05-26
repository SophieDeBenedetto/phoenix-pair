defmodule PhoenixPair.ChallengesController do 
  use PhoenixPair.Web, :controller

  plug Guardian.Plug.EnsureAuthenticated, handler: PhoenixPair.SessionsController

  alias PhoenixPair.{Repo, User, Challenge}

  def index(conn, _params) do
    challenges = Repo.all(Challenge)
    render(conn, "index.json", challenges: challenges)
  end
end