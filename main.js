const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleRepairer = require('role.repairer');
const status = require('status');
const roleWallRepairer = require('./role.wallRepairer');
const spawner = require('spawner');

// get some status updates
status.print(spawner);

// spawn creeps
spawner.run(Game.spawns['Worker'], Game.spawns['Worker'].room.energyCapacityAvailable);

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

// run towers
const towers = Game.spawns['Worker'].room.find(FIND_STRUCTURES, {
    filter: (structure) => structure.structureType === STRUCTURE_TOWER
});

for (const tower of towers) {
    const target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

    if (target != undefined) {
        tower.attack(target);
    }
}