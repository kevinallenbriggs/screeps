let Spawner = () => {
    this.creepCount = {
        harvester: _.sum(Game.creeps, (creep) => creep.memory.role === 'harvester'),
        builder: _.sum(Game.creeps, (creep) => creep.memory.role === 'builder')
    },

    this.run = (minimumCreepCounts) => {
        const spawn = Game.spawns['Spawn1'];
        console.log(this.creepCount);

        if (this.creepCount.harvester < minimumCreepCounts.harvester) {
            spawn.spawnLargestAvailable('harvester');

        } else if (this.creepCount.builder < minimumCreepCounts.builder) {
            spawn.spawnLargestAvailable('builder');
        }
    }
}