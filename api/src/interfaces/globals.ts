export interface SingleConfig {
    serverUrl: string,
    clientUrl: string
}

export interface Config {
    development: SingleConfig,
    production: SingleConfig,
    test: SingleConfig
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
    ' ': boolean
}

export interface Viewport {
    width: number,
    height: number,
}