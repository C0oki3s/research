<h1>This is A Lab Based on SSRF attack That BlackLists localhost and 127.0.0.1</h1>
<h5>But Allow's file:// and other protocols For demonstration purposes</h5>

```javascript 

//This middleware Check's For localhost and 127.0.0.1 in User input.where user have a functionality To pass url in qurey
//(Ex:- http://127.0.0.1:5000?url=http://evil.com)

const BLACKLIST = ["127.0.0.1", "localhost"];
function checkBlackList(req, res, next) {
  const { url } = req.query;
  let Sanitize;
  let re = /[^@]/;
  let badre = /[~^]/;
  if (badre.test(url)) {
    return res.send("BAD CHAR");
  } else {
    if (re.test(url)) {
      Sanitize = url.split("@")[0];
    }
  }
  const Parsered = Parser(Sanitize, true).hostname;
  var Catch = [];
  BLACKLIST.forEach((BLACKLIST) => {
    if (Parsered == BLACKLIST) {
      Catch.push(Sanitize);
    }
  });
  if (Catch.length > 0) {
    res.send("error"); //Error if it see's hostname Localhost or 127.0.0.1
  }
  res.Sanitize = Sanitize;
  next();
}

```
<p>one way to bypass This functionality is DNS-Rebinding attack i have a total different writeup in other repository explaining about dns-rebinding<a href='https://github.com/C0oki3s/Payloads/tree/main/DNS-Rebinding'>Link.</a> Please check if the concept is New or if you need Learn more about it
But i'm going To explain A little about It. priorly i want To warn it's not perfect code it may Break If any bad Char sent to server</p><br>

<p>Now we Don't have any chance of Passing localhost or 127.0.0.1 i.e The Attcker will Bypass This functionailty by Using DNS-rebinding which is By updating DNS "A-RECORD" To 127.0.0.1 So in this Way any attacker will bypass The blacklist check
. Ex:- {we are sending c0okie.xyz( A-Record is 127.0.0.1 which will reslove localhost) It's Same as Rewriting Your system Host-File to make your 127.0.0.1 reslove To any domain that is mention in hostfile}
</p>
