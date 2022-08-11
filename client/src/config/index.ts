import { Config } from '@/interfaces/global'
import development from '@/config/dev'
import production from '@/config/prod'
import test from '@/config/test'

const configs: Config = {
	development,
	production,
    test
}

const exportedConfig = configs[process.env.NODE_ENV];

export default exportedConfig;