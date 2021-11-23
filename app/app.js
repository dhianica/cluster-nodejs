import express from 'express'
import cors from 'cors'
import cluster from 'cluster'
import cpu from 'os'
import moment from 'moment'
import dotenv from 'dotenv'
import console from './utils/console'
import config from './config'
import routes from './routes'

dotenv.config()
const totalCPUs = cpu.cpus().length

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false, parameterLimit: 10000 }))
app.use(express.json())

const IP = config.env.ip
const PORT = config.env.port

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
  app.listen(PORT, () => {
    console.info(`Application date & time starting----@ ${moment().format('YYYY-MM-DD HH:mm:ss')}`)
    console.info(`API server ip & port running--------@ http://${IP}:${PORT}`)
  })

  app.get('/', async (req, res) => {
    try {
      res.send('Success to connect!')
    } catch (error) {
      res.send(`Failed to connect! with error : ${error.message}`)
    }
  })

  app.use('/api', routes)
}
export default app
