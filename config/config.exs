# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :phoenix_pair,
  ecto_repos: [PhoenixPair.Repo]

# Configures the endpoint
config :phoenix_pair, PhoenixPair.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "QSpli1nPbpTobjO+YDt2Uxob8vMz2bobxsuglqrv76wkRaeuGcuiKy1bOuEXeIM2",
  render_errors: [view: PhoenixPair.ErrorView, accepts: ~w(html json)],
  pubsub: [name: PhoenixPair.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :guardian, Guardian,
  issuer: "PhoenixPair",
  ttl: { 3, :days },
  verify_issuer: true,
  secret_key: "123abc",
  serializer: PhoenixPair.GuardianSerializer

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
