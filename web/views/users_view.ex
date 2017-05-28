defmodule PhoenixPair.UsersView do
  use PhoenixPair.Web, :view

  def render("show.json", %{user: user}) do
    %{
      user: user
    }
  end

  def render("error.json", _) do
    %{error: "Can't validate current user"}
  end
end
