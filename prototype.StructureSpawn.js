/**
 * Get information about the part types available for a creep role
 *
 * @param {string} role
 */
StructureSpawn.prototype.getAvailablePartTypes = (role) => {
    switch (role) {
        default:
            return {
                parts: [WORK, CARRY, MOVE],
                cost: WORK + CARRY + MOVE
            };
    }
}

/**
 * Spawn the largest screep of the given role with the energy that's currently
 * available.
 *
 * @param {string} role
 */
StructureSpawn.prototype.spawnLargestAvailable = (role) => {

    let body = [];
    const numberOfParts = Math.floor(this.room.energyAvailable / this.getAvailablePartTypes(role).cost);

    for (const partType of this.getAvailablePartTypes(role).parts) {
        for (let i = 0; i < numberOfParts; i++) {
            body.push(partType);
        }
    }

    this.spawnCreep(
        body,
        role.charAt(0).toUpperCase() + role.slice(1) + '_' + Math.floor(Math.random(3) * 1000),
        {
            memory: {
                role: role,
                working: false
            }
        }
    );
};