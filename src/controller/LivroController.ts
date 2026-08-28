import express from "express";
type Request = express.Request;
type Response = express.Response;

class LivroController {

  static async todos(req: Request, res: Response) {
    return res.status(200).json({ mensagem: "Lista de livros" });
  }

  static async cadastrar(req: Request, res: Response) {
    const { titulo } = req.body;

    return res.status(201).json({
      mensagem: "Livro cadastrado",
      titulo
    });
  }

  static async livro(req: Request, res: Response) {
    const { id } = req.params;

    return res.status(200).json({
      mensagem: "Livro encontrado",
      id
    });
  }
}

export default LivroController;