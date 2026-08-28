import express from "express";

export class AlunoController {
    async listar(req: express.Request, res: express.Response) {
        return res.status(200).json({ message: "Listando alunos" });
    }

    async buscarPorId(req: express.Request, res: express.Response) {
        const { id } = req.params;

        return res.status(200).json({
            message: "Aluno encontrado",
            id
        });
    }

    async criar(req: express.Request, res: express.Response) {
        const { nome } = req.body;

        return res.status(201).json({
            message: "Aluno criado",
            nome
        });
    }

    async atualizar(req: express.Request, res: express.Response) {
        const { id } = req.params;
        const { nome } = req.body;

        return res.status(200).json({
            message: "Aluno atualizado",
            id,
            nome
        });
    }

    async deletar(req: express.Request, res: express.Response) {
        const { id } = req.params;

        return res.status(200).json({
            message: "Aluno deletado",
            id
        });
    }
}