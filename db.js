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


module.exports = {
    getData
}