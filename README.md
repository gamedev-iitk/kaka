# Kaka

A Discord bot for our server.

### Usage

It has three basic functions for now.
1. `$ping`: Replies with `pong`, just to check if the bot is online
1. `$remind`: Message format is somewhat important for now as it has basic error tolerance. Format is 
```
$remind <mention> <time (in hrs)> <reminder message>
```
1. `$remindonce`: Message format is somewhat important for now as it has basic error tolerance. Format is 
```
$remindonce <mention> <time (in hrs)> <reminder message>
```
1. `$clear`: Clears the reminder


### Developing

1. Clone the repository
1. `yarn install` to get all dependencies
1. Create `_config.json` with a key `token` that has your Discord bot token as value
