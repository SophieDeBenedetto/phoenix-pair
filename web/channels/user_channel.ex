defmodule PhoenixPair.UserChannel do 
  use PhoenixPair.Web, :channel

  def join("users:" <> user_id, _params, socket) do
    {:ok, socket} 
  end
end