import Aluno from "../model/Aluno.js";
import type { Request, Response } from "express";

class AlunoController extends Aluno {
  static async todos(req: Request, res: Response): Promise<Response> {
    try {
      const listarAlunos: Array<Aluno> | null = await Aluno.listarAlunos();

      return res.status(200).json(listarAlunos);
    } catch (error) {
      console.error(`Erro ao consultar modelo. ${error}`);

      return res
        .status(500)
        .json({ mensagem: "Não foi possivel acessar a lista de clientes." });
    }
  }

  static async novo(req: Request, res: Response): Promise<Response> {
    try {
      const dadosAluno = req.body;

      const respostaModelo = await Aluno.cadastrarAluno(dadosAluno);

      if (respostaModelo) {
        return res
          .status(201)
          .json({ mensagem: "Aluno cadastrado com sucesso." });
      } else {
        return res.status(400).json({ mensagem: "Erro ao cadastrar aluno." });
      }
    } catch (error) {
      console.error(`Erro no modelo. ${error}`);

      return res
        .status(500)
        .json({ mensagem: "Não foi possível inserir o aluno" });
    }
  }

  static async aluno(req: Request, res: Response): Promise<Response> {
    try {
      const idAluno: number = parseInt(req.params.idAluno as string);

      if (isNaN(idAluno) || idAluno <= 0) {
        return res.status(400).json({ mensagem: "ID inválido." });
      }

      const respostaModelo = await Aluno.listarAluno(idAluno);

      return res.status(200).json(respostaModelo);
    } catch (error) {
      console.error(`Erro ao acessar modelo. ${error}`);
      return res
        .status(500)
        .json({ mensagem: "Não foi possível recuperar o aluno" });
    }
  }
}
export default AlunoController;