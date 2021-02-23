const express = require('express')
const app = express()
const port = 3000

const InputDataDecoder = require('ethereum-input-data-decoder')
const erc20Abi = require(`${__dirname}/lib/abis/erc20.json`).abi

app.get('', function (req, res) {
  res.send('Hello world')
})

app.get('/erc20/:input', function (req, res) {
  const decoder = new InputDataDecoder(erc20Abi)
  res.send(decoder.decodeData(req.params.input))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
