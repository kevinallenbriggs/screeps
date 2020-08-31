module.exports = {
    minimumCreepCount: {
        'harvester': 1,
        'upgrader': 1,
        'builder': 1,
        'repairer': 1,
        'wallRepairer': 4,
    },
    run: function(spawn, minimumCreepCount, creepCount) {
        if (creepCount.harvester < this.minimumCreepCount.harvester) {
            spawn.spawnCreep([MOVE, CARRY, WORK, WORK], _.uniqueId('Harvester'), {'memory': {
                'role': 'harvester',
                'working': false,
            }});
        } else if (creepCount.builder < this.minimumCreepCount.builder) {
            spawn.spawnCreep([MOVE, CARRY, WORK, WORK], _.uniqueId('Builder'), {'memory': {
                'role': 'builder',
                'working': false,
            }});
        } else if (creepCount.repairer < this.minimumCreepCount.repairer) {
            spawn.spawnCreep([MOVE, CARRY, WORK, WORK], _.uniqueId('Repairer'), {'memory': {
                'role': 'repairer',
                'working': false,
            }});
        } else if (creepCount.wallRepairer < this.minimumCreepCount.wallRepairer) {
            spawn.spawnCreep([MOVE, CARRY, WORK, WORK], _.uniqueId('WallRepairer'), {'memory': {
                'role': 'wallRepairer',
                'working': false,
            }});
        } else {
            if (creepCount.upgrader < this.minimumCreepCount.upgrader) {
                spawn.spawnCreep([MOVE, CARRY, WORK, WORK], _.uniqueId('Upgrader'), {'memory': {
                    'role': 'upgrader',
                    'working': false,
                }});
            }
        }
    }
}