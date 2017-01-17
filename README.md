#### Dependencies
Node v6.2.2 and up

Please make sure you have a version of node that can run ECMAScript2015 (ES6).
- run `npm install` to install dependencies
- run `mocha test/unit` to run unit tests.
- run `mocha test/integration` to run integration tests, should take around 45 seconds to run.

- run `node main.js` to play the game.

###### Small Disclaimer
Although there's a fairly small opportunity for this to occur...

I'm using a library called RobotJS to simulate user input to the console for a few UNIT tests.
Because the library actually writes to the console, if you run the unit test and open another
window/pane before the unit tests finish, RobotJS will write to the active session and leave the test hanging.
