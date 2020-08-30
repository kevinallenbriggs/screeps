const roleBuilder = require('role.builder');

module.exports = {
    run: function (creep) {
        if (creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
        } else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working == true) {
            const structureNeedingRepair = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL
            });

            if (structureNeedingRepair !== undefined) {
                if (creep.repair(structureNeedingRepair) !== ERR_NOT_IN_RANGE) {
                    creep.moveTo(structureNeedingRepair);
                }
            } else {
                roleBuilder.run(creep);
            }
        } else {
            const target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
    
            if(target) {
                if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    }
};