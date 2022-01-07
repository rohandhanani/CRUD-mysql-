const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

const port = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//mysql connection
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "crud",
});

// select all data
app.get('/', (req, res) => {
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
            } else {
                connection.query("SELECT * from stud", (err, rows) => {
                    connection.release();
                    if (!err) {
                        res.send(rows)
                    }
                    else {
                        console.log(err);
                    }
                })
            }
        })
    } catch (error) {
        res.status(400).json({
            mes: "data is not selected",
            status: "400"
        })
    }

})

// select perticular data
app.get('/:id', (req, res) => {
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
            } else {
                connection.query("SELECT * from stud where id = ?", [req.params.id], (err, rows) => {
                    connection.release();
                    if (!err) {
                        res.send(rows)
                    }
                    else {
                        console.log(err);
                    }
                })
            }
        })
    } catch (error) {
        res.status(400).json({
            mes: "data is not selected",
            status: "400"
        })
    }
})

// delete perticular data
app.delete('/:id', (req, res) => {
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
            } else {
                connection.query("DELETE from stud where id = ?", [req.params.id], (err, rows) => {
                    connection.release();
                    if (!err) {
                        res.status(200).json({
                            mes: `id no ${req.params.id} is deleted...`,
                            status: "200"
                        })
                    }
                    else {
                        console.log(err);
                    }
                })
            }
        })
    } catch (error) {
        res.status(400).json({
            mes: "data is not deleted",
            status: "400"
        })
    }
})

// insert perticular data
app.post('/', (req, res) => {
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
            } else {
                const userData = req.body;
                connection.query("INSERT into stud SET ? ", userData, (err, rows) => {
                    connection.release();
                    if (!err) {
                        res.status(200).json({
                            mes: `id no ${userData.id} is inserted...`,
                            status: "200"
                        })
                    }
                    else {
                        console.log(err);
                    }
                })
            }
        })
    } catch (error) {
        res.status(400).json({
            mes: "data is not inserted",
            status: "400"
        })
    }
})

//update all data
app.put("/", (req, res) => {
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
            } else {
                const { id, name } = req.body;
                connection.query("UPDATE stud SET name = ? WHERE id = ?  ", [name, id], (err, rows) => {
                    connection.release();
                    if (!err) {
                        res.status(200).json({
                            mes: `id no ${id} is updated...`,
                            status: "200"
                        })
                    } else {
                        console.log(err);
                    }
                })
            }
        })
    } catch (error) {
        res.status(400).json({
            msg: "data is not updated",
            status: "400"
        })
    }
})

app.listen(port, (error) => {
    console.log(`your port is running ${port}`);
})