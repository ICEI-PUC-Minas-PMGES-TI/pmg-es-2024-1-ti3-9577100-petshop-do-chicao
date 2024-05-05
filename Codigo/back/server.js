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
        if (err) return res.json("Erro");
        if (data.length > 0) {
            return res.json("Login bem sucedido")
        } else {
            return res.json("Sem resposta")
        }
    })
})

app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar produtos:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        return res.status(200).json(results);
    });
});
app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM products WHERE idproducts = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar produtos:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        return res.status(200).json(results);
    });
});

app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM products WHERE idproducts = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao excluir produtos :', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        return res.status(200).json({ message: 'Cliente excluído com sucesso!' });
    });
});

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
    const { nome, raca, temperamento, idade,  observacoes, tutor } = req.body;
    const sql = 'INSERT INTO petshop_do_chicao.pets (nome, raca, temperamento, idade,  observacoes, tutor) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [nome, raca, temperamento, idade,  observacoes, tutor], (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar pet:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        return res.status(201).json({ message: 'Pet cadastrado com sucesso!' });
    });
});

app.get('/pets', (req, res) => {
    const sql = 'SELECT * FROM petshop_do_chicao.pets';
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
    const sql = 'SELECT * FROM petshop_do_chicao.pets WHERE id = ?';
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
    const { nome, raca, temperamento, idade,  observacoes, tutor } = req.body;
    const sql = 'UPDATE petshop_do_chicao.pets SET nome = ?, raca = ?, temperamento = ?, idade = ?, observacoes = ?, tutor = ? WHERE id = ?';
    db.query(sql, [nome, raca, temperamento, idade,  observacoes, tutor, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar pet:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        return res.status(200).json({ message: 'Pet atualizado com sucesso!' });
    });
});

app.delete('/pets/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM petshop_do_chicao.pets WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao excluir pet:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        return res.status(200).json({ message: 'Pet excluído com sucesso!' });
    });
});

app.post('/funcionarios', (req, res) => {
    const { nome, email, telefone, cpf, senha, endereco } = req.body;

    const sql = 'INSERT INTO funcionarios (nome, email, telefone, cpf, senha, endereco) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [nome, email, telefone, cpf, senha, endereco], (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar funcionário:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        return res.status(201).json({ message: 'Funcionário cadastrado com sucesso!' });
    });
});

app.listen(8081, () => {
    console.log(`Server is running on port 8081.`);
});