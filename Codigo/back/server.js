const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  // password: "1234",
  password: "1234",
  database: "petshop_do_chicao",
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(sql, [req.body.username, req.body.password], (err, data) => {
    if (err) return res.json("Erro");
    if (data.length > 0) {
      return res.json("Login bem sucedido");
    } else {
      return res.json("Sem resposta");
    }
  });
});

app.get("/products", (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar produtos:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    return res.status(200).json(results);
  });
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM products WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao buscar produtos:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    return res.status(200).json(results);
  });
});

app.post("/products", (req, res) => {
  const { produto_descricao, preco, qtde, qtdecompra, valorcompra, valortotalcompra, idcaixa } = req.body;

  const sql = "INSERT INTO products ( produto_descricao, preco, qtde, qtdecompra, valorcompra, valortotalcompra, idcaixa) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
      sql,
      [produto_descricao, preco, qtde, qtdecompra, valorcompra, valortotalcompra, idcaixa],
      (err, result) => {
        if (err) {
          console.error("Erro ao cadastrar produto:", err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }
        return res
            .status(201)
            .json({ message: "Funcionário cadastrado com sucesso!" });
      }
  );
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM products WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erro ao excluir produtos :", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    return res.status(200).json({ message: "Cliente excluído com sucesso!" });
  });
});

app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { produto_descricao, preco, qtde, qtdecompra, valorcompra, valortotalcompra } = req.body;
  console.log("id", id)
  const sql =
      "UPDATE products SET produto_descricao = ?, preco = ?, qtde = ?, qtdecompra = ?, valorcompra = ?, valortotalcompra = ? WHERE id = ?";
  db.query(sql, [produto_descricao, preco, qtde, qtdecompra, valorcompra, valortotalcompra, id], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar produto:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    return res.status(200).json({ message: "Cliente atualizado com sucesso!" });
  });
});

app.post("/clientes", (req, res) => {
  const { nome, endereco, telefone, email, cpf } = req.body;

  const sql =
      "INSERT INTO clientes (nome, endereco, telefone, email, cpf) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [nome, endereco, telefone, email, cpf], (err, result) => {
    if (err) {
      console.error("Erro ao cadastrar cliente:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    return res.status(201).json({ message: "Cliente cadastrado com sucesso!" });
  });
});

app.get("/clientes", (req, res) => {
  const sql = "SELECT * FROM clientes";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar clientes:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    return res.status(200).json(results);
  });
});

app.get("/clientes/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM clientes WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erro ao buscar cliente:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }
    return res.status(200).json(result[0]);
  });
});

app.put("/clientes/:id", (req, res) => {
  const { id } = req.params;
  const { nome, endereco, telefone, email, cpf } = req.body;
  const sql =
      "UPDATE clientes SET nome = ?, endereco = ?, telefone = ?, email = ?, cpf = ? WHERE id = ?";
  db.query(sql, [nome, endereco, telefone, email, cpf, id], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar cliente:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    return res.status(200).json({ message: "Cliente atualizado com sucesso!" });
  });
});

app.delete("/clientes/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM clientes WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erro ao excluir cliente:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    return res.status(200).json({ message: "Cliente excluído com sucesso!" });
  });
});

app.get("/vendas", (req, res) => {
  const sql = "SELECT * FROM vendas ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar vendas:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    return res.status(200).json(results);
  });
});

app.get("/vendas/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM clientes WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erro ao buscar venda:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Venda não encontrada" });
    }
    return res.status(200).json(result[0]);
  });
});

app.post("/vendas", (req, res) => {
  const {idcliente, tipopagamento, idcaixa, itens } = req.body;

  let valortotal = 0;

  // Mapeia cada item em uma promessa de consulta ao banco de dados
  const promises = itens.map(item => {
    return new Promise((resolve, reject) => {
      const sqlGetProduto = "SELECT preco FROM products WHERE id = ?";
      db.query(sqlGetProduto, [item.idproduto], (err, results) => {
        if (err) {
          console.error("Erro ao obter preço do produto:", err);
          reject(err);
        } else if (results.length > 0) {
          const precoUnitario = results[0].preco;
          valortotal += precoUnitario * item.qtde;
          resolve();
        } else {
          console.error("Produto não encontrado");
          reject(new Error("Produto não encontrado"));
        }
      });
    });
  });

  // Aguarda todas as promessas serem resolvidas
  Promise.all(promises)
      .then(() => {
        const sqlVenda = "INSERT INTO vendas (data, idcliente, valortotal, tipopagamento, idcaixa) VALUES (NOW(), ?, ?, ?, ?)";
        db.query(sqlVenda, [idcliente, valortotal, tipopagamento, idcaixa], (err, result) => {
          if (err) {
            console.error("Erro ao cadastrar venda:", err);
            return res.status(500).json({ error: "Erro interno do servidor" });
          }

          const vendaId = result.insertId;

          // Mapeia cada item em uma promessa de inserção na tabela de itensvenda
          const itensVendaPromises = itens.map(item => {
            const sqlItemVenda = "INSERT INTO itensvenda (idproduto, qtde, idvenda) VALUES (?, ?, ?)";
            return new Promise((resolve, reject) => {
              db.query(sqlItemVenda, [item.idproduto, item.qtde, vendaId], (err, result) => {
                if (err) {
                  console.error("Erro ao cadastrar item de venda:", err);
                  reject(err);
                }
                resolve();
              });
            });
          });

          // Aguarda todas as promessas de inserção na tabela de itensvenda serem resolvidas
          Promise.all(itensVendaPromises)
              .then(() => {
                // Atualiza o estoque de cada produto
                const updateStockPromises = itens.map(item => {
                  const sqlUpdateStock = "UPDATE products SET qtde = qtde - ? WHERE id = ?";
                  return new Promise((resolve, reject) => {
                    db.query(sqlUpdateStock, [item.qtde, item.idproduto], (err, result) => {
                      if (err) {
                        console.error("Erro ao atualizar estoque:", err);
                        reject(err);
                      }
                      resolve();
                    });
                  });
                });

                // Aguarda todas as promessas de atualização de estoque serem resolvidas
                Promise.all(updateStockPromises)
                    .then(() => {
                      res.status(201).json({ message: "Venda cadastrada com sucesso!" });
                    })
                    .catch(err => {
                      console.error("Erro ao atualizar estoque:", err);
                      res.status(500).json({ error: "Erro interno do servidor" });
                    });
              })
              .catch(err => {
                console.error("Erro ao processar venda:", err);
                res.status(500).json({ error: "Erro interno do servidor" });
              });
        });
      })
      .catch(err => {
        console.error("Erro ao processar venda:", err);
        res.status(500).json({ error: "Erro interno do servidor" });
      });
});


app.delete("/vendas/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM vendas WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erro ao excluir venda:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    return res.status(200).json({ message: "Venda excluída com sucesso!" });
  });
});

app.put("/itensvenda/:vendaId", (req, res) => {
  const { vendaId } = req.params;
  const { itens } = req.body;

  const sql = "UPDATE itensvenda SET idvenda = ? WHERE id IN (?)";
  db.query(sql, [vendaId, itens], (err, result) => {
    if (err) {
      console.error("Erro ao associar itens de venda à venda:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    return res.status(200).json({ message: "Itens de venda associados à venda com sucesso!" });
  });
});

app.post("/itensVenda", (req, res) => {
  const { idProduto, quantidade, idVenda } = req.body;

  if (!idProduto || !quantidade) {
    return res.status(400).json({ error: "Campos idProduto e quantidade são obrigatórios" });
  }

  const sql = "INSERT INTO itensvenda (idproduto, qtde) VALUES (?, ?)";
  db.query(sql, [idProduto, quantidade, idVenda], (err, result) => {
    if (err) {
      console.error("Erro ao adicionar item de venda:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    const novoItem = {
      id: result.insertId,
      idProduto,
      quantidade,
      idVenda
    };
    return res.status(201).json(novoItem);
  });
});

app.get("/itensvenda", (req, res) => {
  const sql = `
    SELECT 
      p.produto_descricao,
      i.qtde
    FROM 
      itensvenda i
    JOIN 
      products p ON i.idproduto = p.id
    WHERE 
      i.idvenda IS NULL;
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar itens de venda:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    return res.status(200).json(results);
  });
});

app.get("/itensvenda/:idvenda", (req, res) => {
  const { idvenda } = req.params;
  const sql = `
    SELECT 
      i.id AS item_id,
      p.produto_descricao,
      p.preco AS preco,
      i.qtde
    FROM 
      itensvenda i
    JOIN 
      products p ON i.idproduto = p.id
    WHERE 
      i.idvenda = ?;
  `;
  db.query(sql, [idvenda], (err, results) => {
    if (err) {
      console.error("Erro ao buscar itens de venda:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    return res.status(200).json(results);
  });
});

// app.get("/itensvenda/:id", (req, res) => {
//   const { id } = req.params;
//   const sql = "SELECT * FROM itensvenda WHERE id = ?";
//   db.query(sql, [id], (err, result) => {
//     if (err) {
//       console.error("Erro ao buscar item de venda:", err);
//       return res.status(500).json({ error: "Erro interno do servidor" });
//     }
//     if (result.length === 0) {
//       return res.status(404).json({ message: "Item de venda não encontrado" });
//     }
//     return res.status(200).json(result[0]);
//   });
// });

app.post("/pets", (req, res) => {
  const { nome, raca, temperamento, idade, observacoes, tutor } = req.body;
  const sql =
      "INSERT INTO petshop_do_chicao.pets (nome, raca, temperamento, idade,  observacoes, tutor) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
      sql,
      [nome, raca, temperamento, idade, observacoes, tutor],
      (err, result) => {
        if (err) {
          console.error("Erro ao cadastrar pet:", err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }
        return res.status(201).json({ message: "Pet cadastrado com sucesso!" });
      }
  );
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

app.get('/pets/tutor/:tutor', (req, res) => {
  const { tutor } = req.params;
  const sql = 'SELECT * FROM petshop_do_chicao.pets WHERE tutor =?';
  db.query(sql, [tutor], (err, result) => {
    if (err) {
      console.error('Erro ao buscar pets pelo tutor:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Nenhum pet encontrado com esse tutor' });
    }
    return res.status(200).json(result);
  });
});


app.put('/pets/:id', (req, res) => {
  const { id } = req.params;
  const { nome, raca, temperamento, idade, observacoes, tutor } = req.body;
  const sql = 'UPDATE petshop_do_chicao.pets SET nome = ?, raca = ?, temperamento = ?, idade = ?, observacoes = ?, tutor = ? WHERE id = ?';
  db.query(sql, [nome, raca, temperamento, idade, observacoes, tutor, id], (err, result) => {
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

app.post("/funcionarios", (req, res) => {
  const { nome, email, telefone, cpf, senha, endereco } = req.body;

  const sql =
      "INSERT INTO funcionarios (nome, email, telefone, cpf, senha, endereco) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
      sql,
      [nome, email, telefone, cpf, senha, endereco],
      (err, result) => {
        if (err) {
          console.error("Erro ao cadastrar funcionário:", err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }
        return res
            .status(201)
            .json({ message: "Funcionário cadastrado com sucesso!" });
      }
  );
});

app.put("/funcionarios/:id", (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone, cpf, senha, endereco } = req.body;
  const sql =
      "UPDATE funcionarios SET nome = ?, email = ?, telefone = ?, cpf = ?, senha = ?, endereco = ? WHERE id = ?";
  db.query(sql, [nome, email, telefone, cpf, senha, endereco, id], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar funcionário:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    return res.status(200).json({ message: "Funcionário atualizado com sucesso!" });
  });
});

app.get("/funcionarios", (req, res) => {
  const sql = "SELECT * FROM funcionarios";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar funcionarios:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    return res.status(200).json(results);
  });
});

app.delete("/funcionarios/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM funcionarios WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erro ao excluir funcionário:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    return res.status(200).json({ message: "Cliente excluído com sucesso!" });
  });
});

app.get("/funcionarios/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM funcionarios WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erro ao buscar funcionario:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Funcionário não encontrado" });
    }
    return res.status(200).json(result[0]);
  });
});
app.post("/agendamento", (req, res) => {
  const { servico, cliente, pet, horario, duracao, observacoes } = req.body;

  const sql =
      "INSERT INTO petshop_do_chicao.agendamento (servico, cliente, pet, horario, duracao, observacoes) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
      sql,
      [servico, cliente, pet, horario, duracao, observacoes],
      (err, result) => {
        if (err) {
          console.error("Erro ao cadastrar agendamento:", err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }
        return res
            .status(201)
            .json({ message: "Agendamento cadastrado com sucesso!" });
      }
  );
});

app.get("/agendamento", (req, res) => {
  const sql = "SELECT * FROM petshop_do_chicao.agendamento";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar agendamento:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    return res.status(200).json(results);
  });
});

app.delete('/agendamento/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM petshop_do_chicao.agendamento WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir agendamento:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
    return res.status(200).json({ message: 'Pet excluído com sucesso!' });
  });
});

app.put("/agendamento/:id", (req, res) => {
  const { id } = req.params;
  const { servico, cliente, pet, horario, duracao, observacoes } = req.body;
  const sql =
      "UPDATE petshop_do_chicao.agendamento SET servico = ?, cliente = ?, pet = ?, horario = ?, duracao = ?, observacoes = ? WHERE id = ?";
  db.query(sql, [servico, cliente, pet, horario, duracao, observacoes , id], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar agendamento:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    return res.status(200).json({ message: "Agendamento atualizado com sucesso!" });
  });
});

app.get("/servicos", (req, res) => {
  const sql = "SELECT * FROM petshop_do_chicao.servicos";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar servico:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    return res.status(200).json(results);
  });
});

app.post("/servicos", (req, res) => {
  const { tipo, duracao, valor } = req.body;

  const sql =
      "INSERT INTO petshop_do_chicao.servicos (tipo, duracao, valor) VALUES ( ?, ?, ?)";
  db.query(
      sql,
      [tipo, duracao, valor],
      (err, result) => {
        if (err) {
          console.error("Erro ao cadastrar servico:", err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }
        return res
            .status(201)
            .json({ message: "Servico cadastrado com sucesso!" });
      }
  );
});

app.get("/caixa", (req, res) => {
  const sql = "SELECT * FROM caixa";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar caixas:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    return res.status(200).json(results);
  });
});

app.post("/caixa/abrir", (req, res) => {
  const sql = "INSERT INTO caixa (isopen, valortotal, dataabertura, datafechamento) VALUES (true, 0, NOW(), null);";
  db.query(
      sql,
      (err, result) => {
        if (err) {
          console.error("Erro ao cadastrar caixa:", err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }
        return res
            .status(201)
            .json({ message: "Caixa cadastrado com sucesso!" });
      }
  );
});

app.delete("/caixa/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM caixa WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erro ao excluir funcionário:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    return res.status(200).json({ message: "Cliente excluído com sucesso!" });
  });
});

app.get("/caixa/aberto", (req, res) => {
  const sql = "SELECT id FROM caixa WHERE isopen IS true";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar caixa aberto:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    return res.status(200).json(results);
  });
});

// app.get("/caixa/:id", (req, res) => {
//   const { id } = req.params;
//   const sql = "SELECT * FROM caixa WHERE id = ?";
//   db.query(sql, [id], (err, result) => {
//     if (err) {
//       console.error("Erro ao buscar caixa:", err);
//       return res.status(500).json({ error: "Erro interno do servidor" });
//     }
//     if (result.length === 0) {
//       return res.status(404).json({ message: "Funcionário não encontrado" });
//     }
//     return res.status(200).json(result[0]);
//   });
// });

app.get("/caixa/movimentacoes/:idcaixa", (req, res) => {
  const { idcaixa } = req.params;
  const sql = `SELECT * FROM(
                SELECT v.tipopagamento as descricao, 'Venda' AS tipo, v.data, v.valortotal 
                  FROM caixa c 
                JOIN vendas v ON v.idcaixa = c.id 
                  WHERE c.id = ?
              UNION ALL
                SELECT p.produto_descricao as descricao, 'Estoque' AS tipo, p.data, p.valortotalcompra 
                  FROM caixa c 
                      JOIN products p ON p.idcaixa = c.id 
                WHERE c.id = ?
              ) a ORDER by data desc`;
  
  db.query(sql, [idcaixa, idcaixa], (err, results) => {
    if (err) {
      console.error("Erro ao buscar vendas do caixa:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    return res.status(200).json(results);
  });
});

app.get("/caixa/vendas/:idcaixa", (req, res) => {
  const { idcaixa } = req.params;
  const sql = "SELECT v.id AS id, v.data, v.tipopagamento, v.valortotal FROM caixa c JOIN vendas v ON v.idcaixa = c.id WHERE c.id = ?";
  
  db.query(sql, [idcaixa], (err, results) => {
    if (err) {
      console.error("Erro ao buscar vendas do caixa:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    return res.status(200).json(results);
  });
});

app.get("/caixa/produtos/:idcaixa", (req, res) => {
  const { idcaixa } = req.params;
  const sql = "SELECT p.id, p.produto_descricao, p.preco, p.valorcompra, p.qtde, p.qtdecompra, p.data, p.valortotalcompra FROM caixa c JOIN products p ON p.idcaixa = c.id WHERE c.id = ?"

  db.query(sql, [idcaixa], (err, results) => {
    if (err) {
      console.error("Erro ao buscar produtos do caixa:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    return res.status(200).json(results);
  });
});

app.put("/caixa/fechar", (req, res) => {
  const sqlEncontrarCaixaAberto = "SELECT * FROM caixa WHERE isopen IS true";

  db.query(sqlEncontrarCaixaAberto, (err, result) => {
    if (err) {
      console.error("Erro ao procurar caixa aberto:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    const caixaAbertoId = result[0].id;
    const sqlFecharCaixa = `UPDATE caixa SET isopen = false, datafechamento = NOW() WHERE id = ${caixaAbertoId};`
    db.query(sqlFecharCaixa, (err, result) => {
      if (err) {
        console.error("Erro ao fechar caixa:", err);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }
      return res.status(200).json({ message: "Caixa fechado com sucesso!" });
    });
  });
});

app.put("/caixa/atualizarvalortotal", (req, res) => {
  const sqlEncontrarCaixaAberto = "SELECT * FROM caixa WHERE isopen IS true";

  db.query(sqlEncontrarCaixaAberto, (err, result) => {
    if (err) {
      console.error("Erro ao procurar caixa aberto:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    if (result.length === 0) {
      return res.status(400).json({ error: "Nenhum caixa aberto encontrado" });
    }

    const caixaAberto = result[0];
    const idCaixa = caixaAberto.id;

    const sqlEncontrarMovimentacoes = `SELECT
                                        (SELECT IFNULL(SUM(valortotal), 0) FROM vendas as v WHERE v.idcaixa = ?) -
                                        (SELECT IFNULL(SUM(valortotalcompra), 0) FROM products as p WHERE p.idcaixa = ?) 
                                      AS totalMovimentacoes`
    db.query(sqlEncontrarMovimentacoes, [idCaixa, idCaixa], (err, result) => {
      if (err) {
        console.error("Erro ao procurar movimentações:", err);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }
      const totalVendas = result[0].totalMovimentacoes || 0;
      const sqlAtualizarValorTotal = "UPDATE caixa SET valortotal = ? WHERE id = ?";
      db.query(sqlAtualizarValorTotal, [totalVendas, idCaixa], (err, result) => {
        if (err) {
          console.error("Erro ao atualizar valor total:", err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }
        return res.status(200).json({ message: "Valor total atualizado com sucesso!" });
      });
    });
  });
});

app.listen(8081, () => {
  console.log(`Server is running on port 8081.`);
  console.log(`

    ██████╗ ███████╗████████╗███████╗██╗  ██╗ ██████╗ ██████╗     ██████╗  ██████╗      ██████╗██╗  ██╗██╗ ██████╗ █████╗  ██████╗ 
    ██╔══██╗██╔════╝╚══██╔══╝██╔════╝██║  ██║██╔═══██╗██╔══██╗    ██╔══██╗██╔═══██╗    ██╔════╝██║  ██║██║██╔════╝██╔══██╗██╔═══██╗
    ██████╔╝█████╗     ██║   ███████╗███████║██║   ██║██████╔╝    ██║  ██║██║   ██║    ██║     ███████║██║██║     ███████║██║   ██║
    ██╔═══╝ ██╔══╝     ██║   ╚════██║██╔══██║██║   ██║██╔═══╝     ██║  ██║██║   ██║    ██║     ██╔══██║██║██║     ██╔══██║██║   ██║
    ██║     ███████╗   ██║   ███████║██║  ██║╚██████╔╝██║         ██████╔╝╚██████╔╝    ╚██████╗██║  ██║██║╚██████╗██║  ██║╚██████╔╝
    ╚═╝     ╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝         ╚═════╝  ╚═════╝      ╚═════╝╚═╝  ╚═╝╚═╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝ 
                                                                                                                                   
    
        `)
});