export interface SignedInUser {
    displayName: string;
    email: string;
    uid: string;
    [x: string | number | symbol]: unknown;
}

export interface KeyStateData {
    ArrowUp: boolean,
    ArrowDown: boolean,
    ArrowLeft: boolean,
    ArrowRight: boolean,
    w: boolean,
    s: boolean,
    a: boolean,
    d: boolean,
    f: boolean,
    ' ': boolean,
    viewport: {
        width: number,
        height: number
    }
}