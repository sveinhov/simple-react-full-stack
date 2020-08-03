/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable comma-spacing */
/* eslint-disable semi */
/* eslint-disable import/newline-after-import */
/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable linebreak-style */
const express = require('express');
const os = require('os');

// Modbus settings:
const modbus = require('jsmodbus');
const net = require('net');
const socket = new net.Socket();
const modbusOptions = {
  host: '192.168.79.99',
  port: '502'
};

const app = express();

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

const client = new modbus.client.TCP(socket)

function regs2float(regs) {
  const buf = Buffer.alloc(4);
  buf.writeUInt16BE(regs[0], 2);
  buf.writeUInt16BE(regs[1], 0);
  const num = buf.readFloatBE(0);
  return num;
}

socket.on('connect', function () {
  client.readHoldingRegisters(1004, 10)
    .then(function (resp) {        
        const SBP1 = regs2float(resp.response._body.valuesAsArray.slice(0,2));
        let arr = resp.response._body.valuesAsArray.slice(2,4);
        const SBP2 = regs2float(arr);
        // write2influx(SBP1);
        console.log(SBP1);
        console.log(SBP2);                   
        // console.log(resp.response._body.valuesAsArray)
        socket.end();
    }).catch(function () {
      console.error(require('util').inspect(arguments, {
        depth: null
      }))
      socket.end()
    })
})

socket.on('error', console.error)

setInterval(function () { socket.connect(modbusOptions); },5000)
// socket.connect(options)
