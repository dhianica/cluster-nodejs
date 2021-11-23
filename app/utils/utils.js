/* eslint-disable no-continue */
import fs from 'fs'
import config from '../config'

const getNewestFile = (dir, regexp) => {
  let newest = null
  const files = fs.readdirSync(dir)
  let oneMatched = 0

  for (let i = 0; i < files.length; i++) {
    if (regexp.test(files[i]) === false) continue
    else if (oneMatched === 0) {
      newest = files[i]
      oneMatched = 1
      continue
    }

    const f1Time = fs.statSync(dir + files[i]).mtime.getTime()
    const f2Time = fs.statSync(dir + newest).mtime.getTime()
    if (f1Time > f2Time) { newest[i] = files[i] }
  }

  if (newest != null) { return (dir + newest) }
  return null
}

const sum = (data, key) => data.reduce((a, b) => a + (b[key] || 0), 0)

const delay = (t, val) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(val)
  }, t)
})

const deleteLogFile = () => {
  fs.readdir(config.env.path_logs, (err, files) => {
    if (err) {
      console.log(err)
    }
    files.sort((a, b) => {
      if (a > b) {
        return -1
      }
      if (b > a) {
        return 1
      }
      return 0
    })
    const temp = files.slice(0, 2)
    // eslint-disable-next-line array-callback-return
    files.filter((e) => {
      if (this.indexOf(e) < 0) { fs.unlinkSync(config.env.path_logs + e) }
    },
    temp)
  })
}

module.exports = {
  getNewestFile,
  sum,
  delay,
  deleteLogFile,
}
