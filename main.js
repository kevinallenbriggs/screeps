const roleHarvester = require('./role.harvester');
const roleUpgrader = require('./role.upgrader');
const roleBuilder = require('./role.builder');
const roleRepairer = require('./role.repairer');
const status = require('status');
const roleWallRepairer = require('./role.wallRepairer');
const spawner = require('./spawner');

status.print(spawner);

// spawn creeps
const energyAvailable = Game.spawns['W35N7_spawn'].room.energyAvailable;

if (energyAvailable >= 150) {
    spawner.run(Game.spawns['W35N7_spawn'], Game.spawns['W35N7_spawn'].room.energyCapacityAvailable);
}

// get creepy
for (const name in Game.creeps) {
    const creep = Game.creeps[name];

    switch (creep.memory.role) {
        case 'harvester':
            roleHarvester.run(creep);
            break;
        case 'builder':
            roleBuilder.run(creep);
            break;
        case 'repairer':
            roleRepairer.run(creep);
            break;
        default:
            roleUpgrader.run(creep);
    }

    if (creep.memory.role == 'wallRepairer') {
        roleWallRepairer.run(creep);
    }
}

// run towers
const towers = Game.spawns['W35N7_spawn'].room.find(FIND_STRUCTURES, {
    filter: (structure) => structure.structureType === STRUCTURE_TOWER
});


for (const tower of towers) {
    let target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    const towerEnergyRatio = tower.energy/tower.energyCapacity;

    if (target) {
        tower.attack(target);
    } else if (target = tower.pos.findClosestByRange(FIND_CREEPS, {
        filter: (creep) => creep.hits < creep.hitsMax
    })) {
        tower.heal(target);
    } else if (target = tower.pos.findClosestByRange(FIND_MY_STRUCTURES, {
        filter: (structure) => structure.hits < structure.hitsMax && structure.structureType !== STRUCTURE_WALL
    })) {
        if (towerEnergyRatio > .5) {
            tower.repair(target);
        }
    } else if (target = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => structure.structureType === STRUCTURE_WALL
    })) {
        if (towerEnergyRatio > .75) {
            tower.repair(target);
        }
    }
}


