defmodule PhoenixPair.ChallengeChannel.Monitor do
  use GenServer

  def start_link(initial_state) do
    Agent.start_link(fn -> initial_state end, name: __MODULE__)
  end

  def participant_joined(challenge) do
    Agent.update(__MODULE__, fn state -> do_participant_joined(state, challenge) end)
  end

  def get_challenge_state(challenge) do 
    Agent.get(__MODULE__, fn state -> state[challenge] end)
  end

  def language_update(challenge, language) do
    Agent.update(__MODULE__, fn state -> do_language_update(state, challenge, language) end)
  end

  def current_participant_typing(challenge, user_id) do
    Agent.update(__MODULE__, fn state -> do_current_participant_typing(state, challenge, user_id) end)
  end

  ### Private helper functions

  defp do_participant_joined(state, challenge) do 
    case state[challenge] do
      nil ->   
        state
        |> Map.put(challenge, %{language: "ruby", typing_user_id: nil})
      data ->
        state
    end
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

  defp do_current_participant_typing(state, challenge, user) do
    case state[challenge] do
      nil ->
        state 
        |> Map.put(challenge, %{typing_user_id: user})
      data ->
        update_state(user, state, challenge, :typing_user_id)
    end
  end

  ### second class helpers

  defp update_state(content, state, challenge, key) do 
    put_in(state, [challenge, key], content)
  end
end







