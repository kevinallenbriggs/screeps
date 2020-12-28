const roleHarvester = require('role.harvester');
const roleBuilder = require('role.builder');

module.exports = {
    run: () => {
        for (const name in Game.creeps) {
            const creep = Game.creeps[name];

            switch(creep.memory.role) {
                case 'harvester':
                    roleHarvester.run(creep);
                    break;

                case 'builder':
                    roleBuilder.run(creep);
                    break;
            }
        }
    }
}