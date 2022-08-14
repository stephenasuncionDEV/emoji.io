import development from '@/config/dev'
import production from '@/config/prod'
import test from '@/config/test'

export interface SingleConfig {
    serverUrl: String
    socketUrl: String
}

export interface Config {
    development: SingleConfig,
    production: SingleConfig,
    test: SingleConfig
}

const configs: Config = {
	development,
	production,
    test
}

const exportedConfig = configs[process.env.NODE_ENV];

export default exportedConfig;