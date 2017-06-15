require IEx;
defmodule PhoenixPair.ChallengeChannel.Monitor do
  use GenServer

  #####
  # Client API

  # ...

  def start_link(initial_state) do
    IO.puts "INITIAL STATE"
    IO.inspect initial_state
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
    IO.puts "INSIDE LEFT"
    IO.inspect state
    # %{"2" => %{participants: [29]}}
    %{participants: participants} = state |> Map.get(challenge_id)
    new_users = List.delete(participants, user)
    new_challenge_state = Map.get(state, challenge_id)
      |> Map.put(:participants, new_users)
    state = Map.put(state, challenge_id, new_challenge_state)
    IO.puts "new state after LEFT"
    IO.inspect state
    {:reply, new_users, state}
  end


  def handle_call({:participant_joined, challenge, participant}, _from, state) do
    IO.puts "inside JOINED"
    IO.inspect state
    state = case Map.get(state, challenge) do
      nil ->
        
        state = state
        |> Map.put(challenge, %{participants: [participant]})
        IO.puts "first user JOIN"
        IO.inspect state
        {:reply, %{participants: [participant]}, state}
      data ->
        IO.puts "second using trying to join"
        # %{participants: [29]}
        # :maps.find(:participants, [])
        current_participants = Map.get(data, :participants)
        IO.inspect current_participants
        participants = Enum.uniq([participant | current_participants])
        # Map.put(%{"1" => [], "2" => []}, "2", :participants, [29])
        # maps.put(:participants, [29], [])
        challenge_state = Map.get(state, challenge)
        IO.puts "state right before update with new users"
        IO.inspect state
        new_challenge_state = Map.put(challenge_state, :participants, participants)
        state = Map.put(state, challenge, new_challenge_state)
        IO.puts "SECOND user JOIN"
        IO.inspect state
        {:reply, new_challenge_state, state}
    end
  end

  def handle_calls({:language_udpate, challenge, language}, _from, state) do 
    state = case Map.get(state, challenge) do
      nil ->
        state = state
        |> Map.put(challenge, %{language: language})

        {:reply, %{language: language}, state}
      data ->
        state = state
        |> Map.put(challenge, :language, language)

        {:reply, Map.get(state, challenge), state}
    end
  end
end
