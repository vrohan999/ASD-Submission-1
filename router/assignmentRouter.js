const express = require("express")
const router = express.Router()

const { postData } = require("../db")

router.post("/", async (req, res) => {
    const { title, deadline } = req.body

    const assignment = await postData(title, deadline)

    res.status(201).json(assignment)
})

module.exports = router