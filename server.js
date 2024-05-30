const express = require("express")

const user = require('./routes/user')
const post = require('./routes/post')
const app = express()

app.use(express.json())

app.use("/api/users",user)
app.use("/api/posts",post)

app.use((err,req,res,next)=>{
    res.status(err.status).send(err.message)
})

app.listen(8080, () => {
    console.log('listening on port 8080')
})