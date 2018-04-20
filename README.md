# Phoenix Pair

Pair on coding challenges with real humans in real-time! Users can select a coding challenge to collaborate on with the use of a shared text editor and chat allowing them to work together with the other users in the "challenge room".


## How Does it Work

Phoenix Pair contains a Phoenix API that serves challenge data to a React + Redux client-side app. The Phoenix API leverages Guardian to authenticate users with JWT.

The real-time text-editing and chatting functionality is backed by Phoenix Channels which track the code challenge responses and chat messages. Stateful channel information, like which programming language is currently selected in a channel room and who is currently typing in the shared text editor, is tracked and broadcast to subscribing clients in two different ways.

The currently selected programming lanuage and tracked and broadcast with the help of the `ChallengeChannel.Monitor` module which leverages GenServer to store the language in a "channel state".

The tracking of which user is currently typing is managed by the `ChallengePresence` module. This module leverages PhoenixPresence to track user state in the channel and expose it to all subscribing clients.

## Resources
* JWT Auth w/ Phoenix, Guardian, React/Redux
* Phoenix Presence

## Running the App

