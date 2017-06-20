require IEx;
defmodule PhoenixPair.ChallengeChannel.Monitor do
  use GenServer

  def start_link(initial_state) do
    Agent.start_link(fn -> initial_state end, name: __MODULE__)
    # GenServer.start_link(__MODULE__, initial_state, name: __MODULE__)
  end

  def participant_joined(challenge, participant) do
    # Agent.update(agent, fn list -> ["eggs" | list] end)
    Agent.update(__MODULE__, fn state -> participant_joined(state, challenge, participant) end)
    get_challenge_state(challenge)
   # GenServer.call(__MODULE__, {:participant_joined, challenge, participant})
  end

  def language_update(challenge, language) do
    GenServer.call(__MODULE__, {:language_update, challenge, language})
  end


  def participant_left(challenge, participant) do
    Agent.update(__MODULE__, fn state -> participant_left(state, challenge, participant) end)
    get_challenge_state(challenge)
    # GenServer.call(__MODULE__, {:user_left, challenge, user})
  end

  # def handle_call({:user_left, challenge, user}, _from, state) do
  #   challenge_id = Integer.to_string(challenge)
  #   state = remove_participants(state, challenge_id, user)
  #   |> update_state(state, challenge_id, :participants)
  #   IO.puts "STATE for USER LEFT"
  #   IO.inspect state
  #   {:reply, get_challenge_state(state, challenge), state}
  # end

  # def handle_call({:participant_joined, challenge, participant}, _from, state) do
  #   state = case get_challenge_state(state, challenge) do
  #     nil ->   
  #       state = state
  #       |> Map.put(challenge, %{participants: [participant]})
  #       {:reply, get_challenge_state(state, challenge), state}
  #     data ->
  #       state = data
  #       |> uniq_list(participant)
  #       |> update_state(state, challenge, :participants)
  #       {:reply, get_challenge_state(state, challenge), state}
  #   end
  # end

  # def handle_call({:language_update, challenge, language}, _from, state) do 
  #   state = case get_challenge_state(state, challenge) do
  #     nil ->
  #       state = state
  #       |> Map.put(challenge, %{language: language})

  #       {:reply, %{language: language}, state}
  #     data ->
  #       state = update_state(language, state, challenge, :language)

  #       {:reply, get_challenge_state(state, challenge), state}
  #   end
  # end

  def uniq_list(data, participant) do 
    Enum.uniq([participant | Map.get(data, :participants)])
  end

  def update_state(content, state, challenge, key) when is_integer(challenge) do 
    challenge_id = Integer.to_string(challenge)
    put_in(state, [challenge_id, key], content)
  end

  def update_state(content, state, challenge, key) do 
    put_in(state, [challenge, key], content)
  end

  def remove_participants(state, challenge, user) do 
    %{participants: participants} = state[challenge]
    List.delete(participants, user)
  end

  def get_challenge_state(challenge) when is_integer(challenge) do 
    challenge_id = Integer.to_string(challenge)
    get_challenge_state(challenge_id)
  end

  # def get_challenge_state(challenge) do 
  #   Agent.get(__MODULE__, fn state -> stat[challenge] end))
  # end

  def participant_joined(state, challenge, participant) do 
    case state[challenge] do
      nil ->   
        state
        |> Map.put(challenge, %{participants: [participant]})
      data ->
        data
        |> uniq_list(participant)
        |> update_state(state, challenge, :participants)
    end
  end

  def participant_left(state, challenge, participant) do 
    challenge_id = Integer.to_string(challenge)
    remove_participants(state, challenge_id, participant)
    |> update_state(state, challenge_id, :participants)
  end

  def get_challenge_state(challenge) do 
    Agent.get(__MODULE__, fn state -> state[challenge] end)
  end
end







