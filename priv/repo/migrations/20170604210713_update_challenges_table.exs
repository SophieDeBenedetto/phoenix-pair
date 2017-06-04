defmodule PhoenixPair.Repo.Migrations.UpdateChallengesTable do
  use Ecto.Migration

  def up do
    alter table(:challenges) do
      modify :prompt, :text
    end
  end

  def down do 
    alter table(:challenges) do
      modify :prompt, :string
    end
  end
end
