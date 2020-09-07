module.exports = function() {
    StructureSpawn.prototype.spawnCustomCreep = function(energy, role) {
        const numberOfParts = Math.floor(energy / 200);
        const body = [];
        const availablePartTypes = [WORK, MOVE, CARRY];   // order is important, the parts added first are the first to take damage

        for (const partType of availablePartTypes) {
            for (let i = 0; i < numberOfParts; i++) {
                body.push(partType);
            }
        }

        return this.createCreep(
            body,
            _.uniqueId(_.capitalize(role)),
            {role: role, working: false}
        );
    };
}