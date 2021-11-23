import color from 'colors'
import dotenv from 'dotenv'
import moment from 'moment'
import saveLogText from './log'

dotenv.config()

const clg = {
  log: async (message) => {
    if (process.env.mode !== 'production') {
      console.log(color.grey(`${moment().format('YYYY-MM-DD HH:mm:ss.SSS')} --> ${JSON.stringify(message)}\n`))
    }
  },
  error: async (message) => {
    await saveLogText('error', `${moment().format('YYYY-MM-DD HH:mm:ss.SSS')} --> ${JSON.stringify(message)}\n`)
    console.log(color.bold(color.red(`${moment().format('YYYY-MM-DD HH:mm:ss.SSS')} --> ${JSON.stringify(message)}\n`)))
  },
  info: (message) => { console.log(color.cyan(message)) },
  debug: (message) => { console.log(color.gray(message)) },
}

export default clg
