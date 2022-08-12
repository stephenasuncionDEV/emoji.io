export interface SingleConfig {
    serverUrl: String,
    clientUrl: String
}

export interface Config {
    development: SingleConfig,
    production: SingleConfig,
    test: SingleConfig
}