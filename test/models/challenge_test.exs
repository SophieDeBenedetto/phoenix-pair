defmodule PhoenixPair.ChallengeTest do
  use PhoenixPair.ModelCase

  alias PhoenixPair.Challenge

  @valid_attrs %{prompt: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Challenge.changeset(%Challenge{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Challenge.changeset(%Challenge{}, @invalid_attrs)
    refute changeset.valid?
  end
end
