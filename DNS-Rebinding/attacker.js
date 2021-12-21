const express = require('express')

const app = express()

app.get('/',(req,res)=>{
    res.send(`
        <h1>Hi</h1>
        <script>
        fetch('http://127.0.0.1:7777/secret',{method: 'GET'})
            .then(res => res.text())
            .then(text => document.body.innerHTML += text)
            .catch(err => document.body.innerHTML += err)
        </script>
        `)
})

app.listen(7777)
