defmodule PhoenixPair.PageController do
  use PhoenixPair.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
