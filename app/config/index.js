import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()
let configPath
let parameterPath
let connectionString
const jsonConfig = process.env.mode === 'production' ? 'config.json' : 'config-dev.json'
if (fs.existsSync(path.dirname(jsonConfig)) || fs.existsSync(path.dirname('parameter.json'))) {
  configPath = JSON.parse(fs.readFileSync(path.resolve('config', jsonConfig)))
  parameterPath = JSON.parse(fs.readFileSync(path.resolve('config', 'parameter.json')))
} else {
  console.log('Missing file config.json or parameter.json')
  process.exit(1)
}

const config = {
  env: configPath,
  params: parameterPath,
  logs: configPath.path_logs,
}

export default config
