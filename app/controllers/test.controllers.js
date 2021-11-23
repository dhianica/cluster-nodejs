import moment from 'moment'
// import cluster from 'cluster'
// import cpu from 'os'
import { statusResponse } from '../utils/enumeration'
import console from '../utils/console'

// const totalCPUs = cpu.cpus().length

const index = async (req, res) => {
  console.log('===================================================')
  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress).replace('::ffff:', '')
  console.log(`Run Test Cluster from ${ip}`)
  try {
    let n = parseInt(req.params.n)
    if (n > 5000000000) n = 5000000000
    for (let i = 0; i <= n; i++) {
      console.log(`${moment().format('YYYY-MM-DD hh:mm:ss.SSS')} --> ${i}`)
    }
    res.send({
      status: statusResponse.Success,
      message: 'OK',
    })
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
