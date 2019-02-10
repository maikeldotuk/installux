require("dotenv").config()
const app = require("express")()
const bodyParser = require("body-parser")
const { PASS } = process.env

app.use(bodyParser.json())
app.get("/", (req, res) => {
  res.send(`
    ls -ltr
  `)
})

app.get("/download", (req, res) => {
  res.send(`
    pass=$(zenity --entry Password --text "Enter Password" --title "Security Check")
    curl -d '{"pass":"'$pass'"}' -H 'Content-Type: application/json' http://localhost:3000/secure 2> /dev/null | bash
  `)
})

app.post("/secure", (req, res) => {
  const { pass } = req.body
  if (pass === PASS) {
    res.send(`
   echo 'Inside SSH keys'
`)
  } else {
    res.send(`echo 'Unauthorised'`)
  }
})

app.listen(3000)
