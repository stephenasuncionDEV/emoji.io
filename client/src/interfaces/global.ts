export interface SingleConfig {
    serverUrl: String
}

export interface Config {
    development: SingleConfig,
    production: SingleConfig,
    test: SingleConfig
}