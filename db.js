const { Pool } = require("pg")
require("dotenv").config()

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
})

async function getData(submitted) {
    try {
        let res

        if (submitted !== undefined) {
            res = await pool.query(
                `SELECT * FROM assignments
                 WHERE submitted = $1
                 ORDER BY id DESC`,
                [submitted]
            )
        } else {
            res = await pool.query(
                `SELECT * FROM assignments
                 ORDER BY id DESC`
            )
        }

        return res.rows
    } catch (err) {
        console.log(err)
    }
}

async function postData(title, deadline) {
    try {
        const res = await pool.query(
            `INSERT INTO assignments
            (title, deadline)
            VALUES ($1, $2)
            RETURNING *`,
            [title, deadline]
        )

        return res.rows[0]
    } catch (err) {
        console.log(err)
    }
}

async function updateData(id) {
    try {
        const res = await pool.query(
            `UPDATE assignments
             SET submitted = true
             WHERE id = $1
             RETURNING *`,
            [id]
        )

        return res.rows[0]
    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    getData,
    postData,
    updateData
}