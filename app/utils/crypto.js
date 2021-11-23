import cryptlib from 'cryptlib'
import dotenv from 'dotenv'

dotenv.config()
const encrypt = async (originalText) => new Promise((resolve, reject) => {
  try {
    const iv = cryptlib.generateRandomIV(16)
    const key = cryptlib.getHashSha256(process.env.key, 32)
    const encryptedText = cryptlib.encrypt(JSON.stringify(originalText), key, iv.toString('hex'))
    resolve(encryptedText)
  } catch (err) {
    reject(err)
  }
})

const decrypt = async (encryptText, iv) => new Promise((resolve, reject) => {
  try {
    const keys = cryptlib.getHashSha256(process.env.key, 32)
    const originalText = cryptlib.decrypt(encryptText, keys, iv.toString('hex'))
    resolve(originalText)
  } catch (err) {
    reject(err)
  }
})

export default {
  encrypt,
  decrypt,
}
