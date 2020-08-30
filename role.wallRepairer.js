const roleBuilder = require('role.upgrader');

module.exports = {
    run: function (creep) {
        if (creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
        } else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working == true) {
            const walls = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => structure.structureType == STRUCTURE_WALL
            });

            let target = undefined;

            for (let healthPercentage = 0.0001; healthPercentage <= 1; healthPercentage += 0.0001) {
                target = creep.pos.findClosestByPath(walls, {
                    filter: (wall) => wall.hits / wall.hitsMax < healthPercentage
                });

                if (target !== undefined) {
                    break;
                }
            }

            if (target !== undefined) {
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                // no walls to repair
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