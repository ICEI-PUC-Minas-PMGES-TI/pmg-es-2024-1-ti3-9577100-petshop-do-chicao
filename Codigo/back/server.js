const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'petshop_do_chicao'
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(sql, [req.body.username, req.body.password], (err, data) => {
        if (err) return res.json("Erro");
        if (data.length > 0) {
            return res.json("Login bem sucedido")
        } else {
            return res.json("Sem resposta")
        }
    })
})

app.post('/clientes', (req, res) => {
    const { nome, endereco, telefone, email, cpf } = req.body;

    const sql = 'INSERT INTO clientes (nome, endereco, telefone, email, cpf) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nome, endereco, telefone, email, cpf], (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar cliente:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        return res.status(201).json({ message: 'Cliente cadastrado com sucesso!' });
    });
});

app.get('/clientes', (req, res) => {
    const sql = 'SELECT * FROM clientes';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar clientes:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        return res.status(200).json(results);
    });
});

app.get('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM clientes WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao buscar cliente:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        return res.status(200).json(result[0]);
    });
});

app.put('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const { nome, endereco, telefone, email, cpf } = req.body;
    const sql = 'UPDATE clientes SET nome = ?, endereco = ?, telefone = ?, email = ?, cpf = ? WHERE id = ?';
    db.query(sql, [nome, endereco, telefone, email, cpf, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar cliente:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        return res.status(200).json({ message: 'Cliente atualizado com sucesso!' });
    });
});

app.delete('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM clientes WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao excluir cliente:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        return res.status(200).json({ message: 'Cliente excluído com sucesso!' });
    });
});

app.post('/pets', (req, res) => {
    const { nome, especie, raca, observacoes } = req.body;
    const sql = 'INSERT INTO pets (nome, especie, raca,tutor, observacoes) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nome, especie, raca, tutor, observacoes], (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar pet:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        return res.status(201).json({ message: 'Pet cadastrado com sucesso!' });
    });
});

app.get('/pets', (req, res) => {
    const sql = 'SELECT * FROM pets';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar pets:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        return res.status(200).json(results);
    });
});

app.get('/pets/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM pets WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao buscar pet:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Pet não encontrado' });
        }
        return res.status(200).json(result[0]);
    });
});

app.put('/pets/:id', (req, res) => {
    const { id } = req.params;
    const { nome, especie, raca, observacoes } = req.body;
    const sql = 'UPDATE pets SET nome = ?, especie = ?, raca = ?, observacoes = ? WHERE id = ?';
    db.query(sql, [nome, especie, raca, observacoes, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar pet:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        return res.status(200).json({ message: 'Pet atualizado com sucesso!' });
    });
});

app.delete('/pets/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM pets WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao excluir pet:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        return res.status(200).json({ message: 'Pet excluído com sucesso!' });
    });
});

app.listen(8081, () => {
    console.log(`Server is running on port 8081.`);
});