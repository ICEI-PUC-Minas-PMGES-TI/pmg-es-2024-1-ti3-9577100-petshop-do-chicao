const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Teste123@',
    database: 'petshop_do_chicao'
  });

  app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(sql, [req.body.username, req.body.password], (err, data) => {
        if(err) return res.json("Erro");
        if(data.length > 0){
            return res.json("Login bem sucedido")
        } else {
            return res.json("Sem resposta")
        }
    })
  })


app.listen(8081, () => {
    console.log(`Server is running on port 8081.`);
});