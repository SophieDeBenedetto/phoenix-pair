# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     PhoenixPair.Repo.insert!(%PhoenixPair.SomeModel{})
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
changeset        = PhoenixPair.Challenge.changeset(%PhoenixPair.Challenge, challange_data)
{:ok, challenge} = PhoenixPair.Repo.insert!(changeset)

