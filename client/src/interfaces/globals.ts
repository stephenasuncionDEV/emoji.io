export interface SignedInUser {
    displayName: String;
    email: String;
    uid: String;
    [x: string | number | symbol]: unknown;
}