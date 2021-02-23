const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const InputDataDecoder = require('ethereum-input-data-decoder')
const erc20Abi = require(`${__dirname}/lib/abis/erc20.json`).abi

app.listen(PORT, HOST, () => {
  console.log(`server running on ${HOST} port ${PORT}`)
})

app.get('', function (req, res) {
  res.send({ app: 'Eth Utils API' })
})

app.get('/erc20/decode/:input', function (req, res) {
  const decoder = new InputDataDecoder(erc20Abi)
  res.send(decoder.decodeData(req.params.input))
})
