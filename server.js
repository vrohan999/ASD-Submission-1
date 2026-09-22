const express = require("express")
const app = express()
const assignmentRouter = require("./router/assignmentRouter")

app.use(express.json())
app.use("/assignments", assignmentRouter)

app.listen(3000,() => {
    console.log("Server running...")
})