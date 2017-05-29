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


  def user_left(challenge, user) do
    GenServer.call(__MODULE__, {:user_left, challenge, user})
  end

  def handle_call({:user_left, challenge, user}, _from, state) do
    new_users = state
      |> Map.get(challenge)
      |> List.delete(user)

    state = state
      |> Map.update!(challenge, fn(_) -> new_users end)

    {:reply, new_users, state}
  end


  def handle_call({:participant_joined, challenge, participant}, _from, state) do
    state = case Map.get(state, challenge) do
      nil ->
        state = state
        |> Map.put(challenge, [participant])

        {:reply, [participant], state}
      participants ->
        state = state
        |> Map.put(challenge, Enum.uniq([participant | participants]))

        {:reply, Map.get(state, challenge), state}
   end
 end
end
