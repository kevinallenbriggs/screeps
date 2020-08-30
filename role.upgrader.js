module.exports = {
    run: function(creep) {
        if (creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
        } else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working == true) {
            const target = creep.room.controller;
            if (target) {
                if (creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
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