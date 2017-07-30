defmodule PhoenixPair.Message do
  use PhoenixPair.Web, :model
  alias PhoenixPair.{Chat, User, Message, Repo}

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

  def create(message, chat_id, user_id) do 
    Message.changeset(%Message{}, %{user_id: user_id, chat_id: chat_id, content: message})
    |> Repo.insert
  end
end

# chat_id = current_challenge(socket).chat.id
#     user_id = current_user(socket).id
#     changeset = Message.changeset(%Message{}, %{user_id: user_id, chat_id: chat_id, content: message})

#     case Repo.insert changeset do 
#       {:ok, message} -> 
#         challenge = get_challenge(current_challenge(socket).id)
#         broadcast! socket, "chat:message_created", %{challenge: challenge}
#         {:noreply, socket}
#       {:error, message} ->
#         {:reply, {:error, %{error: "Error creating message for chat #{chat_id}"}}, socket}
#     end
