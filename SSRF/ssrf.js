const express = require("express");
const { exec } = require("child_process");
const Parser = require("url-parse");
const xhr = require("xhr2");
const app = express();

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
    res.send("error");
  }
  res.Sanitize = Sanitize;
  next();
}

app.get("/", checkBlackList, (req, res) => {
  const { url } = req.query;
  try {
    var xhttp = new xhr();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        res.send(this.responseText);
      }
    };
    xhttp.open("GET", res.Sanitize, true);
    xhttp.send();
  } catch {
    exec(`curl ${res.Sanitize}`, (err, stdout, stderr) => {
      try {
        if (err) {
          res.send("Error");
        } else if (stdout) {
          res.send(stdout);
        } else {
          res.send("stderr");
        }
      } catch (error) {
        res.send("Error");
      }
    });
  }
});

app.listen(5000);
