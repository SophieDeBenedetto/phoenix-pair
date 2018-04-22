# Phoenix Pair

Pair on coding challenges with real humans in real-time! Users can select a coding challenge to collaborate on with the use of a shared text editor and chat allowing them to work together with the other users in the "challenge room".

## How Does it Work

Phoenix Pair contains a Phoenix API that serves challenge data to a React + Redux client-side app. The Phoenix API leverages Guardian to authenticate users with JWT.

The real-time text-editing and chatting functionality is backed by Phoenix Channels which track the code challenge responses and chat messages. Stateful channel information, like which programming language is currently selected in a channel room and who is currently typing in the shared text editor, is tracked and broadcast to subscribing clients in two different ways.

The currently selected programming lanuage and tracked and broadcast with the help of the `ChallengeChannel.Monitor` module which leverages GenServer to store the language in a "channel state".

The tracking of which user is currently typing is managed by the `ChallengePresence` module. This module leverages PhoenixPresence to track user state in the channel and expose it to all subscribing clients.

## Resources

I wrote some things!

* [JWT Auth w/ Phoenix and React Router 4](http://www.thegreatcodeadventure.com/jwt-auth-with-phoenix-and-react-router-4/)
* [Using Agent to Maintain Channel State in Phoenix](http://www.thegreatcodeadventure.com/using-genserver-to-maintain-channel-state-in-phoenix/)
* [Tracking User State with Phoenix Presence, React and Redux](http://www.thegreatcodeadventure.com/tracking-user-state-with-phoenix-presence-react-and-redux/)

## Running the App

* Install dependencies with `mix deps.get`
* Create and migrate your database with `mix ecto.create && mix ecto.migrate`
* Seed the DB with some code challenge prompts `mix run priv/repo/seeds.exs`
* Start Phoenix endpoint with `mix phoenix.server`
* Register or sign in as the test user:

```
username: moebi@email.com
password: password
```

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

