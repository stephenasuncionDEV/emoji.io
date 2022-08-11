export interface Physics {
    groundPos: Number,
    playerSpeed: Number,
    jumpVelocity: Number,
    sideJumpVelocity: Number,
    gravity: Number
}

const physicsTable: Physics = {
    groundPos: 660,
    playerSpeed: 0.8,
    jumpVelocity: 40,
    sideJumpVelocity: 0.4,
    gravity: 0.7
}

module.exports.gamePhysics = physicsTable;