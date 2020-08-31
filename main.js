const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const spawner = require('spawner');
const roleRepairer = require('role.repairer');
const status = require('status');
const roleWallRepairer = require('./role.wallRepairer');

// get some status updates
status.print(spawner);

// spawn creeps
spawner.run(Game.spawns['Worker'], status);

// get creepy
for (const name in Game.creeps) {
    const creep = Game.creeps[name];

    if (creep.memory.role == 'harvester') {
        roleHarvester.run(creep);
    }

    if (creep.memory.role == 'upgrader') {
        roleUpgrader.run(creep);
    }

    if (creep.memory.role == 'builder') {
        roleBuilder.run(creep);
    }

    if (creep.memory.role == 'repairer') {
        roleRepairer.run(creep);
    }

    if (creep.memory.role == 'wallRepairer') {
        roleWallRepairer.run(creep);
    }
}