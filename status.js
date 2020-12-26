const _ = require('lodash');

module.exports = {
    print: function(spawner) {
        console.log('Creep Count - ' +
            this.creepCount.harvester + '/' + spawner.minimumCreepCount.harvester + ' Harvesters | ' +
            this.creepCount.upgrader + '/' + spawner.minimumCreepCount.upgrader + ' Upgraders | ' +
            this.creepCount.builder + '/' + spawner.minimumCreepCount.builder + ' Builders | ' +
            this.creepCount.repairer + '/' + spawner.minimumCreepCount.repairer + ' Repairers | ' +
            this.creepCount.wallRepairer + '/' + spawner.minimumCreepCount.wallRepairer + ' WallRepairers\n' +

            'Creeps Working - ' + _.sum(Game.creeps, (creep) => creep.memory.working == true) +
                '/' + this.totalCreeps
        );
    },
    totalCreeps: _.filter(Game.creeps).length,
    creepCount: {
        'harvester': _.sum(Game.creeps, (creeps) => creeps.memory.role == 'harvester'),
        'upgrader': _.sum(Game.creeps, (creeps) => creeps.memory.role == 'upgrader'),
        'builder': _.sum(Game.creeps, (creeps) => creeps.memory.role == 'builder'),
        'repairer': _.sum(Game.creeps, (creeps) => creeps.memory.role == 'repairer'),
        'wallRepairer': _.sum(Game.creeps, (creeps) => creeps.memory.role == 'wallRepairer'),
    }
}