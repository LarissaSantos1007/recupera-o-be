import type { EmprestimoDTO } from "../interface/EmprestimoDTO.js";
import Emprestimo from "../model/Emprestimo.js";
import type { Request, Response } from "express";

class EmprestimoController extends Emprestimo {
  static async todos(req: Request, res: Response): Promise<Response> {
    try {
      const listarEmprestimos: Array<Emprestimo> | null =
        await Emprestimo.listarEmprestimos();

      return res.status(200).json(listarEmprestimos);
    } catch (error) {
      console.error(`Erro ao consultar modelo. ${error}`);

      return res
        .status(500)
        .json({ mensagem: "Não foi possivel acessar a lista de Emprestimos." });
    }
  }
}

export default EmprestimoController;