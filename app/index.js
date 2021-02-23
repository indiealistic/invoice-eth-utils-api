const express = require('express')
const app = express()
const port = 3000
const host = '0.0.0.0'

const InputDataDecoder = require('ethereum-input-data-decoder')
const erc20Abi = require(`${__dirname}/lib/abis/erc20.json`).abi

app.listen(port, host, () => {
  console.log(`server running on ${HOST} port ${PORT}`)
})

app.get('', function (req, res) {
  res.send('Eth Utils App')
})

app.get('/erc20/decode/:input', function (req, res) {
  const decoder = new InputDataDecoder(erc20Abi)
  res.send(decoder.decodeData(req.params.input))
})
