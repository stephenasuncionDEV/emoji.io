export interface Physics {
    groundPos: number,
    playerSpeed: number,
    jumpVelocity: number,
    sideJumpVelocity: number,
    gravity: number
}

export const gamePhysics: Physics = {
    groundPos: 660,
    playerSpeed: 0.8,
    jumpVelocity: 40,
    sideJumpVelocity: 0.4,
    gravity: 0.7
}