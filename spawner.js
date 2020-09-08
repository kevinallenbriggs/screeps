const status = require('status');
require('./prototype.spawn')();

module.exports = {
    minimumCreepCount: {
        'harvester': 2,
        'upgrader': 1,
        'builder': 1,
        'repairer': 1,
        'wallRepairer': 1,
    },
    run: function(spawn, energy) {
        if (status.creepCount.harvester < this.minimumCreepCount.harvester) {
            if (spawn.spawnCustomCreep(energy, 'harvester') === ERR_NOT_ENOUGH_ENERGY) {
                    spawn.spawnCustomCreep(spawn.room.energyAvailable, 'harvester');
                }
        } else if (status.creepCount.builder < this.minimumCreepCount.builder) {
            spawn.spawnCustomCreep(energy, 'builder');
        } else if (status.creepCount.repairer < this.minimumCreepCount.repairer) {
            spawn.spawnCustomCreep(energy, 'repairer');
        } else if (status.creepCount.wallRepairer < this.minimumCreepCount.wallRepairer) {
            spawn.spawnCustomCreep(energy, 'wallRepairer');
        } else {
            if (status.creepCount.upgrader < this.minimumCreepCount.upgrader) {
                spawn.spawnCustomCreep(Math.floor(energy / 2), 'upgrader');
            }
        }
    }
}