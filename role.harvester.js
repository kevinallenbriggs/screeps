const roleBuilder = require("./role.builder");

module.exports = {
    run: function (creep) {
        // if creep is bringing energy to the spawn but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }

        let target = undefined;

        // if creep is supposed to transfer energy to the spawn
        if (creep.memory.working == true) {
            target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (structure) => (structure.structureType == STRUCTURE_SPAWN ||
                 structure.structureType == STRUCTURE_EXTENSION ||
                 structure.structureType == STRUCTURE_CONTAINER ||
                 structure.structureType == STRUCTURE_TOWER) &&
                 structure.energy < structure.energyCapacity
            });

            // drop off at a container instead of doing nothing

            // try to transfer energy, if the spawn is not in range
            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards the spawn
                    creep.moveTo(target);
                }
            } else {
                roleBuilder.run(creep);
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            // find closest source
            let target = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);

            if (target) {
                if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                let target = creep.pos.findClosestByPath(FIND_SOURCES);

                if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }

            }
        }
    }
};