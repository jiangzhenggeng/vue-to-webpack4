const path = require('path')
const fs = require('fs')
const _cutomChunkModuls = require('../config').module

let cutomChunkModuls = _cutomChunkModuls
if (typeof process.env.npm_config_module === 'string' && process.env.npm_config_module) {
  let modele = process.env.npm_config_module.split(/\s/)
  cutomChunkModuls = cutomChunkModuls.filter((item) => {
    if (modele.indexOf(item.id) === -1) {
      return false
    }
    return true
  })
}

if (process.env.NODE_ENV !== 'production') {
  cutomChunkModuls = [
    cutomChunkModuls[0],
  ]
}

let notFindModule = []
let entryObject = {}
let chunksObject = {}
cutomChunkModuls.forEach((module, index) => {
  if (module.entry) {
    let entry = {}
    Object.keys(module.entry).forEach((key) => {
      entryObject[key + '-' + index] = module.entry[key]
      entry[key + '-' + index] = module.entry[key]
    })
    module.entry = entry
  }
  if (module.chunks) {
    Object.keys(module.chunks).forEach((subModule) => {
      chunksObject[subModule] = module.chunks[subModule]
      module.chunks[subModule].forEach((moduleName) => {
        if (!fs.existsSync(path.join(__dirname, '../node_modules', moduleName))) {
          notFindModule.push(moduleName)
        }
      })
    })
  }
})

if (notFindModule.length) {
  console.log('没有找到' + notFindModule.length + '个模块:', notFindModule.join(' '))
  process.exit()
}

module.exports = {}
module.exports.entry = entryObject
module.exports.chunks = chunksObject
module.exports.cutomChunkModuls = cutomChunkModuls
