defmodule PhoenixPair.Router do
  use PhoenixPair.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug Guardian.Plug.VerifyHeader
  end

  scope "/api", PhoenixPair do
    pipe_through :api

    scope "/v1" do
      post "/registrations", RegistrationController, :create
      post "/sessions", SessionsController, :create
      delete "sessions", SessionsController, :delete
      get "/challenges", ChallengesController, :index
      get "/current_user", UsersController, :me
    end
  end

  scope "/", PhoenixPair do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/*path", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", PhoenixPair do
  #   pipe_through :api
  # end
end
