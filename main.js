require('./prototype.spawn');


const spawner = new Spawner();
const conductor = require('conductor');

const HOME = Game.rooms['W2N5'];
spawner.run({
    harvester: 8,
    builder: 2
}, );

conductor.run();