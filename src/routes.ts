import { Router } from "express";

import AlunoController from "./controller/AlunoController.js";
import LivroController from "./controller/LivroController.js";
import EmprestimoController from "./controller/EmprestimoController.js";

const router = Router();

router.get("/api", (req, res) => {
  res.json({ mensagem: "API funcionando!" });
});

router.get("/api/aluno", AlunoController.todos);
router.post("/api/cadastrar/aluno", AlunoController.cadastrarAluno);
router.post("/api/login", AlunoController.login);
router.get("/api/aluno/:idAluno", AlunoController.aluno);

router.get("/api/livro", LivroController.todos);
router.post("/api/cadastrar/livro", LivroController.novo);

router.get("/api/emprestimo", EmprestimoController.todos);

export { router };