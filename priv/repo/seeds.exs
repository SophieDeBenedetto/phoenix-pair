# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
user_data =   %{
                first_name: "moebi",
                last_name: "huang",
                email: "moebi@email.com",
                password: "password",
                password_confirmation: "password"
              }
changeset = PhoenixPair.User.changeset(%PhoenixPair.User{}, user_data)
PhoenixPair.Repo.insert!(changeset)

challenge_data   = %{
                      title: "Multiples of 3 and 5",
                      prompt: "If we take all of the natural numbers below 10 that are multiples of 3 and 5, we get 3, 5, 6, and 9. The sum of these multiples is 23. Find the sum of all the multiples of 3 and 5 below 1000."
                    }
changeset = PhoenixPair.Challenge.changeset(%PhoenixPair.Challenge{}, challenge_data)
challenge = PhoenixPair.Repo.insert!(changeset)
changeset = PhoenixPair.Chat.changeset(%PhoenixPair.Chat{}, %{challenge_id: challenge.id})
PhoenixPair.Repo.insert!(changeset)



challenge_data   = %{
                      title: "Fibonacci Numbers",
                      prompt: "Each new term in the Fibonacci sequence is generted by adding the previous two terms. By starting with 1 and 2, the first 10 terms will be: \n 1, 2, 3, 5, 8, 13, 21, 34, 55, 89 \n By considering the terms in the Fibonacci sequence whose values do not exceed fourmillion, find the sum of the even-valued terms."
                    }
changeset = PhoenixPair.Challenge.changeset(%PhoenixPair.Challenge{}, challenge_data)
challenge = PhoenixPair.Repo.insert!(changeset)
changeset = PhoenixPair.Chat.changeset(%PhoenixPair.Chat{}, %{challenge_id: challenge.id})
PhoenixPair.Repo.insert!(changeset)



challenge_data   = %{
                      title: "Largest Prime Factor",
                      prompt: "The prime factors of 13195 are 5, 7, 13 and 29. What is the largest prime factor of the number 600851475143?"
                    }
changeset = PhoenixPair.Challenge.changeset(%PhoenixPair.Challenge{}, challenge_data)
challenge = PhoenixPair.Repo.insert!(changeset)
changeset = PhoenixPair.Chat.changeset(%PhoenixPair.Chat{}, %{challenge_id: challenge.id})
PhoenixPair.Repo.insert!(changeset)

