<p align="center">
<img width="150px" src="https://ten-men.herokuapp.com/favicon.png" />
<h2 align="center"> Ten Men </h2>
<p align="center">
 CS:GO 10 Man Stat Tracking (for the boys)
 </p>
</p>

## Overview

Ten Men, or 10M for short, is a web app created for my friends to log our unofficial CS:GO 10 man matches, which aren't available in Counter Strike: Global Offensive's (CS:GO) standard match history.

It is built with Express and Postgres on the backend, serving a pre-compiled Svelte project. It is hosted on Heroku.

This repo contains all code for the server at the root, as well as the Svelte project nested in the frontend folder. NOTE: Svelte's build folder is intentionally not in the .gitignore because it makes it easier for Heroku to serve it (Doesn't need to build it itself).

## Features

### Accessible Player & Game Stats

As mentioned before, CS:GO doesn't display private matches very easily, which means knowing which games were played when and who participated in them is difficult to do. Moreover, understanding a player's stats with this limitation makes it impossible to make informed decisions about who is playing "good" or "bad".

With this app, it becomes very easy to see how well a player does in 10 mans, whether it is in one match or overall. This could potentially impact pick order when drafting teams, and fix team imbalances.

### Admin Permissions

Since this app is completely public, there has to be some way to differentiate strangers and those in the friend group. There is no problem with strangers seeing our stats, but giving them the ability to add and remove games is an issue.

Using the [express-session](https://github.com/expressjs/session#readme) and [connect-pg-simple](https://github.com/voxpelli/node-connect-pg-simple#readme) packages, I implemented a session based login system that only gives you admin permissions once you enter the master password.

Admin permissions include being able to log new matches, update player profile pictures, and remove matches.

### Name Autocompletion

As an admin, writing in 10 player names every time I have to log a match is supremely annoying, so I added something to make the experience more pleasant.

Now, when an admin attempts to log a match, the match data (after it is properly parsed and checked if it is a duplicate) is hydrated with the names of players who have had the same username in previous matches.

## To Do

There are still a few things that aren't finished yet.

- Testing
- Individual match page (Only frontend unfinished)
- Individual player page (Only frontend unfinished)
- Updating profile pictures
- Removing matches
