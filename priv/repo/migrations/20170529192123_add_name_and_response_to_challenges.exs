defmodule PhoenixPair.Repo.Migrations.AddNameAndResponseToChallenges do
  use Ecto.Migration

  def change do
    alter table(:challenges) do
      add :title, :string
      add :response, :string
    end
  end
end
