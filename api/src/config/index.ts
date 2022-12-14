import { Config } from '../interfaces/globals'
import development from './dev'
import production from './prod'
import test from './test'

const configs: Config = {
	development,
	production,
    test
}

const exportedConfig = configs[process.env.NODE_ENV as keyof Config];
console.log('[emoji.io] running', process.env.NODE_ENV, 'configuration');

export default exportedConfig