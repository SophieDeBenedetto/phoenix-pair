require IEx;
defmodule PhoenixPair.ChallengeChannel.Monitor do
  use GenServer

  def start_link(initial_state) do
    Agent.start_link(fn -> initial_state end, name: __MODULE__)
  end

  def participant_joined(challenge, participant) do
    Agent.update(__MODULE__, fn state -> do_participant_joined(state, challenge, participant) end)
    get_challenge_state(challenge)
  end

  def language_update(challenge, language) do
    Agent.update(__MODULE__, fn state -> do_language_update(state, challenge, language) end)
    get_challenge_state(challenge)
  end


  def participant_left(challenge, participant) do
    Agent.update(__MODULE__, fn state -> do_participant_left(state, challenge, participant) end)
    get_challenge_state(challenge)
  end

  def current_participant_typing(challenge, user) do
    Agent.update(__MODULE__, fn state -> do_current_participant_typing(state, challenge, user) end)
    get_challenge_state(challenge) 
  end

  ### Private helper functions

  defp do_participant_joined(state, challenge, participant) do 
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

  defp do_participant_left(state, challenge, participant) when is_integer(challenge) do 
    challenge_id = Integer.to_string(challenge)
    do_participant_left(state, challenge_id, participant)
  end

  defp do_participant_left(state, challenge, participant) do 
    remove_participants(state, challenge, participant)
    |> update_state(state, challenge, :participants)
  end

  defp do_language_update(state, challenge, language) when is_integer(challenge) do 
    challenge_id = Integer.to_string(challenge)
    do_language_update(state, challenge_id, language)
  end

  defp do_language_update(state, challenge, language) do 
    case state[challenge] do
      nil ->
        state
        |> Map.put(challenge, %{language: language})
      data ->
        update_state(language, state, challenge, :language)
    end
  end

  defp do_current_participant_typing(state, challenge, user) when is_integer(challenge) do 
    challenge_id = Integer.to_string(challenge)
    do_current_participant_typing(state, challenge_id, user)
  end

  defp do_current_participant_typing(state, challenge, user) do
    case state[challenge] do
      nil ->
        state 
        |> Map.put(challenge, %{user: user})
      data ->
        update_state(user, state, challenge, :user)
    end
  end

  ### second class helpers

  defp get_challenge_state(challenge) when is_integer(challenge) do 
    Integer.to_string(challenge)
    |> get_challenge_state
  end

  defp get_challenge_state(challenge) do 
    Agent.get(__MODULE__, fn state -> state[challenge] end)
  end

  defp update_state(content, state, challenge, key) when is_integer(challenge) do 
    challenge_id = Integer.to_string(challenge)
    update_state(content, state, challenge_id, key)
  end

  defp update_state(content, state, challenge, key) do 
    put_in(state, [challenge, key], content)
  end
  
  defp uniq_list(data, participant) do 
    Enum.uniq([participant | Map.get(data, :participants)])
  end

  defp remove_participants(state, challenge, user) do 
    %{participants: participants} = state[challenge]
    List.delete(participants, user)
  end
end







