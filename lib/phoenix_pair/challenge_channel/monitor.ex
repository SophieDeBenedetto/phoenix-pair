require IEx;
defmodule PhoenixPair.ChallengeChannel.Monitor do
  use GenServer

  #####
  # Client API

  # ...

  def start_link(initial_state) do
   GenServer.start_link(__MODULE__, initial_state, name: __MODULE__)
  end

  def participant_joined(challenge, participant) do
   GenServer.call(__MODULE__, {:participant_joined, challenge, participant})
  end

  def language_udpate(challenge, language) do
    GenServer.call(__MODULE__, {:language_udpate, challenge, language})
  end


  def user_left(challenge, user) do
    GenServer.call(__MODULE__, {:user_left, challenge, user})
  end

  def handle_call({:user_left, challenge, user}, _from, state) do
    challenge_id = Integer.to_string(challenge)
    new_users = state
      |> Map.get(challenge_id)
      |> List.delete(user)

    state = state
      |> Map.update!(challenge_id, fn(_) -> new_users end)

    {:reply, new_users, state}
  end


  def handle_call({:participant_joined, challenge, participant}, _from, state) do
    state = case Map.get(state, challenge) do
      nil ->
        state = state
        |> Map.put(challenge, %{participants: [participant]})

        {:reply, %{participants: [participant]}, state}
      participants ->
        state = state
        participants = Enum.uniq([participant | participants])
        |> Map.put(challenge, %{participants: participants})

        {:reply, Map.get(state, challenge), state}
    end
  end

  def handle_calls({:language_udpate, challenge, language}, _from, state) do 
    state = case Map.get(state, challenge) do
      nil ->
        state = state
        |> Map.put(challenge, %{language: language})

        {:reply, %{language: language}, state}
      participants ->
        state = state
        |> Map.put(challenge, %{language: language})

        {:reply, Map.get(state, challenge), state}
    end
  end
end
