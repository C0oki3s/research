<h3>DNS-rebinding is A attack that a malicious website interacting to Your mechine or network</h3> 
<ul>
  <h3>THE EXPLOIT :- C0oki3s.xyz -> mydomain but it's A record is 127.0.0.1</h1><br>
 <pre>
 You can see this in action 
      1) Go to cmd or terminal and run python -m http.server 
      2) so your running a server on port 8000
      3) Now open my domain in browser or do a curl request with same port that -
                      - your local service was running Ex:- if your running on :8000 -> C0oki3s.xyz:8000 
      4) Now You will see your local file's because (python will enable directory listing)-
                      - That's It Now. you have a idea about DNS rebinding 
                           </pre>
  
  
```js
 //This is victim server running on Localhost 
const express = require('express')

const cors = require('cors')

const app = express()

app.options('/',cors(),(req,res)=>{
    // res.set('Allow','PUT')
    // res.send('ok')
})
  
app.get('/secret',cors(),(req,res)=>{
    res.sendFile(__dirname + "/secret.txt")
})

app.put('/',cors(),(req,res)=>{

    })
})

app.listen(7777)
 ```


```js
  //This is attacker server running on 1.1.1.1 Then change to 127.0.0.1
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
```


I'm gonna explain the code for a bit
 
 <-- VICTIM SIDE -->
<p>Victim working on a project in localhost:7777 With API Route (127.0.0.1/,127.0.0.1/secret) where [/] is PUT request and [/secret] is GET request. Now the victim will Open a malicious website that was served by an attacker which makes a request to (/)path or (/secret)path The browser will revoke the request because the domain that we're requesting indeed localhost which will not resolve where attacker domain name is attacker.com and A record is pointing to 117.12.19.5</p>

<p>Think in this way that you have a domain name which attacker.com - A record 172.1.1.19 | This cannot directly communicate with your localhost even it's still in development or your making legit requests this is where SOP prevent cross communication</p>

<p>if SOP isn't there, then an attacker seamless steals your secret's</p>  
    <pre>
      Attacker(IP)  117.12.19.5
            |
            |
          Browser
            |
            |
 Victim(IP)  192.168.1.2 or 127.0.0.1 if Localhost IP is whitelisted then we need to find actual IP
 
where if your requeting from cross origin The browser will throw an error related to CORS or SOP. according to developer.mozilla.org that <a href="https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy">SOP</a> requires (schema, domain, port Must be same as destination to interact)
  </pre>
 
 <-- ATTACKER SIDE -->
 <p>A successful attack need social engineering and the attack is far-fetched and requires user interaction</p>

<p>An attacker Firstly use a Domain name attacker.com with - A record 117.12.19.5 And fetch the content of 127.0.0.1 which will be abrogate by SOP</p>

<p>Now an attacker will set the DNS-CACHE to 5000-6000 that the IP address will resolve every 5000-6000 milliseconds</p>

<p>With learning victim's IP or using loopback address, now after 5000-6000 milliseconds The attacker will change IP to 127.0.0.1 in DNS which Now fetch-request in attacker delivered website will process through and give sucessful result</p>

<p>you can have a doubt that the script only works once which is when website been served for first time but an attacker can implement setInterval(callback_exploit,1000) where the function will be called every 1000 ms</p>

<p>after successfully fetching internal file, The request will be cached with varnish, HAProxy, Nginx or stored into localStorage if the data is stored after 5 seconds the attacker will change IP back to any public address to lookup the data in localStorage or to fetch it from public address</p>
  
<h3>DNS-Rebinding can be used in ssrf attack's where the localhost or 127.0.0.1 is blacklisted By simply updating your domain A record to 127.0.0.1 You can Bypass the blacklist</h3>

<pre>
 Many ORG using This technique For internal development or debugging purpose. 
 They're Also using 127.0.0.1 in DNS record's for different reason's
 if you would search in google there will be lots of blog's etc..!!!
 </pre>
 
GET,POST are normal request and there will be no objection from browser <br />
But when comes to PUT and DELETE they are not normal request And request use preflight which is OPTIONS / HTTP/1.1 and browser will 
look into server if server accepts then No problem else response never comes back!!
  
