import { server } from "./server.js";
import { DatabaseModel } from "./model/DatabaseModel.js";

const port = 3333;

new DatabaseModel()
  .testeConexao()
  .then(async (resbd) => {
    if (resbd) {
      const db = new DatabaseModel();
      try {
        await db.pool.query(`ALTER TABLE Aluno ADD COLUMN IF NOT EXISTS senha VARCHAR(255) NOT NULL;`);
        console.log('Coluna senha adicionada ou já existe.');
      } catch (err) {
        console.error('Erro ao adicionar coluna senha:', err);
      }
      server.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
      });
    } else {
      console.log("Não foi possível conectar ao banco de dados");
    }
  })
  .catch((err: unknown) => {
    console.error("Erro ao testar conexão com o banco de dados:", err);
  });