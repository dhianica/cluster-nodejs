/* eslint-disable max-len */
/* eslint-disable camelcase */
import fs from 'fs'
import moment from 'moment'
import config from '../config'

const isFileExist = (path) => new Promise((resolve, reject) => {
  try {
    fs.exists(path, (exist) => {
      if (exist) resolve(true)
      else reject(new Error({ err: `Missing folder ${path}`, src: 'isFileExist' }))
    })
  } catch (error) {
    reject(new Error({ error, src: 'isFileExist' }))
    process.exit(1)
  }
})

// eslint-disable-next-line no-async-promise-executor
const saveLogText = async (type, message) => new Promise(async (resolve, reject) => {
  try {
    await isFileExist(config.logs)
    fs.exists(`${config.logs}/${type}_logs_${moment().format('YYYYMMDD')}.log`, (exist) => {
      if (exist) {
        try {
          fs.appendFile(`${config.logs}/${type}_logs_${moment().format('YYYYMMDD')}.log`, message, { flag: 'a+' }, (err) => {
            if (err) {
              throw err
            } else {
              resolve(true)
            }
          })
        } catch (error) {
          reject(error)
        }
      } else {
        fs.writeFile(`${config.logs}/${type}_logs_${moment().format('YYYYMMDD')}.log`, message, { flag: 'a+' }, (err) => {
          if (err) {
            throw err
          } else {
            resolve(true)
          }
        })
      }
    })
  } catch (error) {
    reject(error)
  }
})

export default saveLogText
