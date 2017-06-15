require IEx;
defmodule PhoenixPair.ChallengeChannel.Monitor do
  use GenServer



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
    state = remove_participants(state, challenge_id, user)
    |> update_state(state, challenge_id)

    {:reply, get_challenge_state(state, challenge), state}
  end

  def handle_call({:participant_joined, challenge, participant}, _from, state) do
    state = case get_challenge_state(state, challenge) do
      nil ->   
        state = state
        |> Map.put(challenge, %{participants: [participant]})
        {:reply, get_challenge_state(state, challenge), state}
      data ->
        state = data
        |> uniq_list(participants)
        |> update_state(state, challenge)
        {:reply, get_challenge_state(state, challenge), state}
    end
  end

  def handle_calls({:language_udpate, challenge, language}, _from, state) do 
    state = case get_challenge_state(state, challenge) do
      nil ->
        state = state
        |> Map.put(challenge, %{language: language})

        {:reply, %{language: language}, state}
      data ->
        state = state
        |> Map.put(challenge, :language, language)

        {:reply, get_challenge_state(state, challenge), state}
    end
  end

  def uniq_list(data, participants) do 
    Enum.uniq([participant | Map.get(data, :participants)])
  end

  def update_state(participants, state, challenge) do 
    put_in(state, [challenge, :participants], participants)
  end

  def remove_participants(state, challenge, user) do 
    %{participants: participants} = get_challenge_state(state, challenge)
    List.delete(participants, user)
  end

  def get_challenge_state(state, challenge) do 
    Map.get(state, challenge)
  end
end
