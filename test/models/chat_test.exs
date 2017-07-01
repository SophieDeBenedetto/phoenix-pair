defmodule PhoenixPair.ChatTest do
  use PhoenixPair.ModelCase

  alias PhoenixPair.Chat

  @valid_attrs %{challenge_id: 42}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Chat.changeset(%Chat{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Chat.changeset(%Chat{}, @invalid_attrs)
    refute changeset.valid?
  end
end
