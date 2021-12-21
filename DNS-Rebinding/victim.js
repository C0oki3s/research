 const express = require('express')
const { exec } = require('child_process')
const cors = require('cors')

const COMMAND = 'calc'

const app = express()

app.options('/',cors(),(req,res)=>{
    // res.set('Allow','PUT')
    // res.send('ok')
})
  
app.get('/secret',cors(),(req,res)=>{
    res.sendFile(__dirname + "/secret.txt")
})

app.put('/',cors(),(req,res)=>{
    exec(COMMAND,err => {
        if(err) res.status(500).send(`Error At backend ${status}`)
        else res.status(200).send("Sucess")
    })
})

app.listen(7777)
