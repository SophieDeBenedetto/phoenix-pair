require IEx;
defmodule PhoenixPair.UsersController do
  use PhoenixPair.Web, :controller

  alias PhoenixPair.{GuardianSerializer}


  def me(conn, _params) do
    token = conn.assigns.guardian_default_jwt
    case Guardian.decode_and_verify(token) do
      {:ok, claims} ->
        case GuardianSerializer.from_token(claims["sub"]) do
          {:ok, user} ->
            conn
            |> render("show.json", user: user)
          {:error, _reason} ->
            conn
            |> render("error.json")
        end
      {:error, _reason} ->
        render("error.json")
    end
  end
end
