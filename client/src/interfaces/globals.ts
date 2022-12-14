export interface SignedInUser {
    displayName: string;
    email: string;
    uid: string;
    [x: string | number | symbol]: unknown;
}

export interface KeyState {
    ArrowUp: boolean,
    ArrowDown: boolean,
    ArrowLeft: boolean,
    ArrowRight: boolean,
    w: boolean,
    s: boolean,
    a: boolean,
    d: boolean,
    f: boolean,
    ' ': boolean
}

export interface Viewport {
    width: number,
    height: number
}