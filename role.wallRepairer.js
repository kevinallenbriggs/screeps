const roleBuilder = require('role.builder');

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

            let targetWall = undefined;

            for (let healthPercentage = 0.01; healthPercentage <= 1; healthPercentage += 0.01) {

                for (const wall of walls) {
                    if (wall.hits / wall.hitsMax < healthPercentage) {
                        targetWall = wall;
                        break;
                    }
                }
            }

            if (targetWall !== undefined) {
                if (creep.repair(targetWall) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetWall);
                }
            } else {
                // no walls to repair
                roleUpgrader.run(creep);
            }

        } else {
            const targetSource = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
    
            if(targetSource) {
                if(creep.harvest(targetSource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetSource);
                }
            }
        }
    }
};