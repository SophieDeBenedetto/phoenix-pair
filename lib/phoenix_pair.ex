defmodule PhoenixPair do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec

    children = [
      supervisor(PhoenixPair.Repo, []),
      supervisor(PhoenixPair.Endpoint, []),
      supervisor(PhoenixPair.ChallengePresence, []),
      worker(PhoenixPair.ChallengeChannel.Monitor, [%{}])
    ]

    # See http://elixir-lang.org/docs/stable/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: PhoenixPair.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    PhoenixPair.Endpoint.config_change(changed, removed)
    :ok
  end
end
