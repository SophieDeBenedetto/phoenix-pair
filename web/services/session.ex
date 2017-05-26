require IEx;
defmodule PhoenixPair.Session do 
  alias PhoenixPair.{Repo, User}
  def authenticate(%{"email" => email, "password" => password}) do 
    user = Repo.get_by(User, email: email)
    case verify_password(password, user.encrypted_password) do
      true -> 
        {:ok, user}
      _ ->
        :error
    end
  end

  defp verify_password(password, pw_hash) do 
    Comeonin.Bcrypt.checkpw(password, pw_hash)
  end
end