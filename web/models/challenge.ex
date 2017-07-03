defmodule PhoenixPair.Challenge do
  use PhoenixPair.Web, :model
  alias PhoenixPair.{Chat}

  @derive {Poison.Encoder, only: [:id, :prompt, :title, :response, :chat]}
  schema "challenges" do
    field :prompt, :string
    field :title, :string
    field :response, :string
    has_one :chat, Chat
    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:prompt, :title])
    |> validate_required([:prompt, :title])
  end
end
