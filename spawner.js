const status = require('status');
require('./prototype.spawn')();

module.exports = {
    minimumCreepCount: {
        'harvester': 2,
        'upgrader': 1,
        'builder': 2,
        'repairer': 1,
        'wallRepairer': 6,
    },
    run: function(spawn, energy) {
        if (status.creepCount.harvester < this.minimumCreepCount.harvester) {
            if (spawn.spawnCustomCreep(energy, 'harvester') === ERR_NOT_ENOUGH_ENERGY &&
                status.creepCount.harvester == 0) {
                    spawn.spawnCustomCreep(spawn.room.energyAvailable, 'harvester');
                }
        } else if (status.creepCount.builder < this.minimumCreepCount.builder) {
            spawn.spawnCustomCreep(energy, 'builder');
            // spawn.spawnCreep([MOVE, CARRY, WORK, WORK], _.uniqueId('Builder'), {'memory': {
            //     'role': 'builder',
            //     'working': false,
            // }});
        } else if (status.creepCount.repairer < this.minimumCreepCount.repairer) {
            spawn.spawnCustomCreep(energy, 'repairer');

            // spawn.spawnCreep([MOVE, CARRY, WORK, WORK], _.uniqueId('Repairer'), {'memory': {
            //     'role': 'repairer',
            //     'working': false,
            // }});
        } else if (status.creepCount.wallRepairer < this.minimumCreepCount.wallRepairer) {
            spawn.spawnCustomCreep(energy, 'wallRepairer');

            // spawn.spawnCreep([MOVE, CARRY, WORK, WORK], _.uniqueId('WallRepairer'), {'memory': {
            //     'role': 'wallRepairer',
            //     'working': false,
            // }});
        } else {
            if (status.creepCount.upgrader < this.minimumCreepCount.upgrader) {
                spawn.spawnCustomCreep(energy, 'upgrader');

                // spawn.spawnCreep([MOVE, CARRY, WORK, WORK], _.uniqueId('Upgrader'), {'memory': {
                //     'role': 'upgrader',
                //     'working': false,
                // }});
            }
        }
    }
}