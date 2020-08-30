const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const spawner = require('spawner');
const roleRepairer = require('./role.repairer');

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
console.log('Creep Count - ' +
    creepCount.harvester + '/' + minimumCreepCount.harvester + ' Harvesters | ' +
    creepCount.upgrader + '/' + minimumCreepCount.upgrader + ' Upgraders | ' +
    creepCount.builder + '/' + minimumCreepCount.builder + ' Builders |' +
    creepCount.repairer + '/' + minimumCreepCount.repairer + ' Repairers\n' +

    'Working Creeps - ' + _.sum(Game.creeps, (creeps) => creeps.memory.working == true)
);

console.log('Structures needing repair - ' +
    _.sum(Game.structures)
);

// spawn in creeps
const spawn = Game.spawns['Worker'];
spawner.run(spawn, minimumCreepCount, creepCount);

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