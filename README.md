# Phoenix Pair

A real-time pair programming app that allows multiple users to collaborate on smiple code challenges by typing in a shared text editor. 

## Technologies

* Phoenix API back-end
* React + Redux front-end
* Leverages Phoenix Channels to handle real-time updates of users typing in shared text editor and real-time chatting feature
* Uses React Router v4 + Guardian JWT plug to handle authentication
* Uses Phoenix Presence to track users in a given "challenge room" and broadcast out typing indicators to display which users are currently typing in the shared text editor

## Up and Running

* clone, `mix deps.get`, `npm install`
* `mix run priv/repo/seeds.exs`
* `mix phoenix.server`

## Learn about it!
I wrote some stuff:
* [Authentication with React Router 4 and Guardian JWT](http://www.thegreatcodeadventure.com/jwt-auth-with-phoenix-and-react-router-4/)
* Tracking Users with Phoenix Presence
