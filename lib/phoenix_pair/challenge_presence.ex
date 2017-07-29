defmodule PhoenixPair.ChallengePresence do 
   use Phoenix.Presence, otp_app: :phoenix_pair,
                        pubsub_server: PhoenixPair.PubSub

end