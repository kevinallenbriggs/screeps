module.exports = {
    run: function(creepCount, minimumCreepCount) {
        console.log('Creep Count - ' +
            creepCount.harvester + '/' + minimumCreepCount.harvester + ' Harvesters | ' +
            creepCount.upgrader + '/' + minimumCreepCount.upgrader + ' Upgraders | ' +
            creepCount.builder + '/' + minimumCreepCount.builder + ' Builders |' +
            creepCount.repairer + '/' + minimumCreepCount.repairer + ' Repairers\n' +

            'Working Creeps - ' + _.sum(Game.creeps, (creep) => creep.memory.working == true)
        );
    }
};