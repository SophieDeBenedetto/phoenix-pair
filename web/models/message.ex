defmodule PhoenixPair.Message do
  use PhoenixPair.Web, :model
  alias PhoenixPair.{Chat, User}

  @derive {Poison.Encoder, only: [:id, :chat_id, :user, :content]}

  schema "messages" do
    belongs_to :chat, Chat
    belongs_to :user, User
    field :content, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:chat_id, :content, :user_id])
    |> validate_required([:chat_id, :content, :user_id])
  end
end
