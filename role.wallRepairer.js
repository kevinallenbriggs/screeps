module.exports = {
    run: function (creep) {

        if (creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
        } else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working == true) {

            if (creep.memory.wall == undefined) {
                const potentialTargets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => structure.structureType == STRUCTURE_WALL ||
                        structure.structureType == STRUCTURE_RAMPART
                });

                potentialTargets.sort((a, b) => a.structureType == STRUCTURE_RAMPART > b.structureType == STRUCTURE_RAMPART);

                for (let healthPercentage = 0.0015; healthPercentage <= 1; healthPercentage += 0.0015) {

                    for (const structure of potentialTargets) {
                        if (structure.hits / structure.hitsMax < healthPercentage) {
                            creep.memory.wall = structure;
                            break;
                        }
                    }
                }
            }

            if (creep.memory.wall !== undefined) {
                if (creep.repair(Game.getObjectById(creep.memory.wall)) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.wall));
                }
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