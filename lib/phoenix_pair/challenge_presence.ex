defmodule PhoenixPair.ChallengePresence do
  use Phoenix.Presence, otp_app: :phoenix_pair,
                        pubsub_server: PhoenixPair.PubSub

  alias PhoenixPair.{ChallengePresence}

  def track_user_join(socket, user) do
    ChallengePresence.track(socket, user.id, %{
      typing: false,
      first_name: user.first_name,
      user_id: user.id
    })
  end

  def do_user_update(socket, user, %{typing: typing}) do
    ChallengePresence.update(socket, user.id, %{
      typing: typing,
      first_name: user.first_name,
      user_id: user.id
    })
  end
end
