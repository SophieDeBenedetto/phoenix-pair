defmodule PhoenixPair.Chat do
  use PhoenixPair.Web, :model
  alias PhoenixPair.{Challenge, Message}
  schema "chats" do
    belongs_to :challenge, Challenge
    has_many :messages, Message
    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:challenge_id])
    |> validate_required([:challenge_id])
  end
end
