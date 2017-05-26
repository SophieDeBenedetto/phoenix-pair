defmodule PhoenixPair.Challenge do
  use PhoenixPair.Web, :model

  @derive {Poison.Encoder, only: [:id, :prompt]}
  schema "challenges" do
    field :prompt, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:prompt])
    |> validate_required([:prompt])
  end
end
