const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());
const PORT = 3002;
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//get users 

app.get('/', (req, res) => {
    let sql = 'SELECT * FROM users';
    conn.query(sql, (error, result) => res.status(error ? 500 : 200).json(error ? { error } : { result }));
});

//get single user
app.get('/user/:id', (req, res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM users WHERE id = ${id}`;
    conn.query(sql, (error, result) => res.status(error ? 500 : 200).json(error ? { error } : { result }));
});

// create user 

app.post('/user/:id', (req, res)=>{
    const {nombres, apellidos, telefono, email} = req.body;

    let sql =`INSERT INTO users (nombres, apellidos, telefono, email) VALUES ("${nombres}", "${apellidos}", "${telefono}", "${email}")`;
    conn.query(sql, (error, result) => res.status(error ? 500 : 200).json(error ? { error } : { result }));
})

//update user
app.put('/user/:id', (req, res)=>{
    const id = req.params.id;
    const {nombres, apellidos, telefono, email} = req.body;
    let sql =`UPDATE users SET nombres = ?, apellidos = ?, telefono = ?, email = ? WHERE id = ${id} `;
    conn.query(sql, [nombres, apellidos, telefono, email], (error, result) => res.status(error ? 500 : 200).json(error ? { error } : { result, id: id }));
})

//delete user
app.delete('/user/:id', (req, res) => {
    let id = req.params.id;
    let sql = `DELETE  FROM users WHERE id = ${id}`;
    conn.query(sql, (error, result) => res.status(error ? 500 : 200).json(error ? { error } : { message: 'user is deleted successfully', success:true }));
});
app.listen(PORT);
