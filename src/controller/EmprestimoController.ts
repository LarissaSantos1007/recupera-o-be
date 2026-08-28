import express from "express";
type Request = express.Request;
type Response = express.Response;

import Emprestimo from "../model/Emprestimo.js";

class EmprestimoController {

  static async todos(req: Request, res: Response) {
    try {
      const listarEmprestimos = await Emprestimo.listarEmprestimos();

      return res.status(200).json(listarEmprestimos);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        mensagem: "Não foi possivel acessar a lista de Emprestimos."
      });
    }
  }

}

export default EmprestimoController;