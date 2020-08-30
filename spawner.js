module.exports = {
    run: function(spawn, minimumCreepCount, creepCount) {
        if (creepCount.harvester < minimumCreepCount.harvester) {
            spawn.spawnCreep([MOVE, MOVE, CARRY, WORK], _.uniqueId('Harvester'), {'memory': {
                'role': 'harvester',
                'working': false,
            }});
        } else if (creepCount.builder < minimumCreepCount.builder) {
            spawn.spawnCreep([MOVE, CARRY, MOVE, WORK], _.uniqueId('Builder'), {'memory': {
                'role': 'builder',
                'working': false,
            }});
        } else if (creepCount.repairer < minimumCreepCount.repairer) {
            spawn.spawnCreep([MOVE, CARRY, WORK, WORK], _.uniqueId('Repairer'), {'memory': {
                'role': 'repairer',
                'working': false,
            }});
        } else {
            if (creepCount.upgrader < minimumCreepCount.upgrader) {
                spawn.spawnCreep([MOVE, CARRY, WORK, WORK], _.uniqueId('Upgrader'), {'memory': {
                    'role': 'upgrader',
                    'working': false,
                }});
            }
        }
    }
}