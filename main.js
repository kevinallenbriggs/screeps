const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const spawner = require('spawner');
const roleRepairer = require('role.repairer');
const status = require('status');

const minimumCreepCount = {
    'harvester': 8,
    'upgrader': 1,
    'builder': 1,
    'repairer': 1
}

const creepCount = {
    'harvester': _.sum(Game.creeps, (creeps) => creeps.memory.role == 'harvester'),
    'upgrader': _.sum(Game.creeps, (creeps) => creeps.memory.role == 'upgrader'),
    'builder': _.sum(Game.creeps, (creeps) => creeps.memory.role == 'builder'),
    'repairer': _.sum(Game.creeps, (creeps) => creeps.memory.role == 'repairer'),
}

// get some status updates
status.run(creepCount, minimumCreepCount, Game.structures);

// spawn creeps
spawner.run(Game.spawns['Worker'], minimumCreepCount, creepCount);

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
}