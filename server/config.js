const qiniu = require('qiniu')

// 创建上传凭证
const accessKey = '3omrWZrTo6wKxuQ1TKUgVmpjFypId7NtoPZDq42x'
const secretKey = 'IsITVSDeG3omI1xilcK1rx7QsN94nGsjvwOkADXl'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
  scope: 'dzone-images-storage',
  expires: 7200
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)

module.exports = {
  uploadToken
}