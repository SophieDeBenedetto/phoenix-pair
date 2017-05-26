defmodule PhoenixPair.ChallengesView do 
  use PhoenixPair.Web, :view 

  def render("index.json", %{challenges: challenges}) do 
    %{challenges: challenges}
  end
end