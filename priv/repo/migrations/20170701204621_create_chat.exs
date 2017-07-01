defmodule PhoenixPair.Repo.Migrations.CreateChat do
  use Ecto.Migration

  def change do
    create table(:chats) do
      add :challenge_id, :integer

      timestamps()
    end

  end
end
