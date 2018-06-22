const express = require('express');
const router = express.Router()
const multiparty = require('multiparty')
const fs = require('fs')

const downloadFileToLocal = (fromPath, toPath) => 
  new Promise( (resolve, reject) => {
    fs.readFile(fromPath, (err, data) => {
      fs.writeFile(toPath, data, (err) => {
        fs.unlink(fromPath, () => {
          resolve()
        });
      }); 
    }); 
  })
  
router.post('/upload', (req, res) => {
  const form = new multiparty.Form();

  return form.parse(req, (err, fields, files) => {
    console.log('err: ', err)
    console.log('fields: ', fields)
    console.log('files: ', files)

    const {path: tempPath, originalFilename} = files.myFile[0];
    const copyToPath = "./" + originalFilename;

    return downloadFileToLocal (tempPath, copyToPath).then(
        () => res.json({msg: 'done'})
    )
  })
})

module.exports = router