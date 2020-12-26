const roleUpgrader = require('./role.upgrader');

module.exports = {
    run: function (creep) {
        if (creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
        } else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working == true) {
            if (target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
                filter: (site) => site.structureType == STRUCTURE_EXTENSION
            })) {
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else if (target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)) {
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                roleUpgrader.run(creep);
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