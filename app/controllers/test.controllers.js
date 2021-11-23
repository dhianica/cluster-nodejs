// import moment from 'moment'
import cluster from 'cluster'
import cpu from 'os'
import { statusResponse } from '../utils/enumeration'
import console from '../utils/console'

const totalCPUs = cpu.cpus().length

const index = async (req, res) => {
  console.log('===================================================')
  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress).replace('::ffff:', '')
  console.log(`Run Test Cluster from ${ip}`)
  try {
    let n = parseInt(req.params.n)
    if (n > 5000000000) n = 5000000000

    if (cluster.isMaster) {
      console.log(`Number of CPUs is ${totalCPUs}`)
      console.log(`Master ${process.pid} is running`)
      // Fork workers.
      for (let i = 0; i < totalCPUs; i++) {
        cluster.fork()
      }
      cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`)
        console.log("Let's fork another worker!")
        cluster.fork()
      })
    } else {
      // for (let i = 0; i <= n; i++) {
      //   console.log(`${moment().format('YYYY-MM-DD hh:mm:ss.SSS')} --> ${i}`)
      // }
      setTimeout(() => {
        res.send({
          status: statusResponse.Success,
          message: 'OK',
        })
      }, 60000)
    }
  } catch (error) {
    console.error(error.message)
    res.send({
      status: statusResponse.Error,
      message: error.message,
    })
  }
}

export default {
  index,
}
