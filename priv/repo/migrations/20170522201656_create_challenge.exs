defmodule PhoenixPair.Repo.Migrations.CreateChallenge do
  use Ecto.Migration

  def change do
    create table(:challenges) do
      add :prompt, :string

      timestamps()
    end

  end
end
