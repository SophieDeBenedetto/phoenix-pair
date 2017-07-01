defmodule PhoenixPair.MessageTest do
  use PhoenixPair.ModelCase

  alias PhoenixPair.Message

  @valid_attrs %{chat_id: 42, content: "some content", user_id: 42}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Message.changeset(%Message{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Message.changeset(%Message{}, @invalid_attrs)
    refute changeset.valid?
  end
end
