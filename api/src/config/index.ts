import { Config } from '../interfaces/global'
import development from './dev'
import production from './prod'
import test from './test'

const configs: Config = {
	development,
	production,
    test
}

const exportedConfig = configs[process.env.NODE_ENV as keyof Config];

export default exportedConfig