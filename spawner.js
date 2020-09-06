const status = require('status');

module.exports = {
    minimumCreepCount: {
        'harvester': 2,
        'upgrader': 1,
        'builder': 2,
        'repairer': 1,
        'wallRepairer': 6,
    },
    run: function(spawn) {
        if (status.creepCount.harvester < this.minimumCreepCount.harvester) {
            spawn.spawnCreep([MOVE, CARRY, WORK, WORK], _.uniqueId('Harvester'), {'memory': {
                'role': 'harvester',
                'working': false,
            }});
        } else if (status.creepCount.builder < this.minimumCreepCount.builder) {
            spawn.spawnCreep([MOVE, CARRY, WORK, WORK], _.uniqueId('Builder'), {'memory': {
                'role': 'builder',
                'working': false,
            }});
        } else if (status.creepCount.repairer < this.minimumCreepCount.repairer) {
            spawn.spawnCreep([MOVE, CARRY, WORK, WORK], _.uniqueId('Repairer'), {'memory': {
                'role': 'repairer',
                'working': false,
            }});
        } else if (status.creepCount.wallRepairer < this.minimumCreepCount.wallRepairer) {
            spawn.spawnCreep([MOVE, CARRY, WORK, WORK], _.uniqueId('WallRepairer'), {'memory': {
                'role': 'wallRepairer',
                'working': false,
            }});
        } else {
            if (status.creepCount.upgrader < this.minimumCreepCount.upgrader) {
                spawn.spawnCreep([MOVE, CARRY, WORK, WORK], _.uniqueId('Upgrader'), {'memory': {
                    'role': 'upgrader',
                    'working': false,
                }});
            }
        }
    }
}