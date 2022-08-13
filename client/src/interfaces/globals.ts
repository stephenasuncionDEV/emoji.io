export interface SignedInUser {
    displayName: string;
    email: string;
    uid: string;
    [x: string | number | symbol]: unknown;
}