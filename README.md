# cluster-nodejs
Application for handle single thread nodejs


For handle single thread nodejs you can use cluster in library nodejs

    if (cluster.isMaster) {
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

      app = express()

      app.use(cors())
      app.use(express.urlencoded({ extended: false, parameterLimit: 10000 }))
      app.use(express.json())

      const IP = config.env.ip
      const PORT = config.env.port
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
