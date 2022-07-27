var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.json())
app.use(cors())

const port = 3000
const fs = require('fs')
var clipboardFilePath = './Media/clipboard.txt'
var chromeExtensionFilePath = '/home/pi/ClipboardSharing/Media/ClipboardSharing.zip'

app.get('/', (req, res) => {
    var clipboardStringToSend = fs.readFileSync(clipboardFilePath).toString()
    var responseObject = {"clipboard":clipboardStringToSend}
    res.send(responseObject)
})

app.post('/', (req, res) => {
    var clipboardStringToSave = req.body["clipboard"]
    fs.writeFileSync(clipboardFilePath, clipboardStringToSave)
    res.send(clipboardStringToSave)
})

app.get('/chrome-extension', (req, res) => {
    res.sendFile(chromeExtensionFilePath)
})

app.listen(port, () => {
    console.log(`ClipboardSharing now listening at http://192.168.86.36:${port}`);
})