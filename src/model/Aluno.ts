import type { AlunoDTO } from "../interface/AlunoDTO.js";
import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

class Aluno {
  private idAluno: number = 0;
  private ra: number = 0;
  private nome: string;
  private sobrenome: string;
  private dataNascimento: Date;
  private endereco: string;
  private email: string;
  private celular: number;

  constructor(
    _ra: number,
    _nome: string,
    _sobrenome: string,
    _dataNascimento: Date | string,
    _endereco: string,
    _email: string,
    _celular: number
  ) {
    this.ra = _ra;
    this.nome = _nome;
    this.sobrenome = _sobrenome;
    this.dataNascimento = new Date(_dataNascimento);
    this.endereco = _endereco;
    this.email = _email;
    this.celular = _celular;
  }

  public getIdAluno(): number {
    return this.idAluno;
  }
  public setIdAluno(_idAluno: number): void {
    this.idAluno = _idAluno;
  }

  public getRa(): number {
    return this.ra;
  }
  public setRa(_ra: number): void {
    this.ra = _ra;
  }

  public getNome(): string {
    return this.nome;
  }
  public setNome(_nome: string) {
    this.nome = _nome;
  }

  public getSobrenome(): string {
    return this.sobrenome;
  }
  public setSobrenome(_sobrenome: string) {
    this.sobrenome = _sobrenome;
  }

  public getDataNascimento(): Date {
    return this.dataNascimento;
  }
  public setDataNascimento(_dataNascimento: Date) {
    this.dataNascimento = _dataNascimento;
  }

  public getEndereco(): string {
    return this.endereco;
  }
  public setEndereco(_endereco: string) {
    this.endereco = _endereco;
  }

  public getEmail(): string {
    return this.email;
  }
  public setEmail(_email: string) {
    this.email = _email;
  }

  public getCelular(): number {
    return this.celular;
  }
  public setCelular(_celular: number) {
    this.celular = _celular;
  }

  static async listarAlunos(): Promise<Array<Aluno> | null> {
    try {
      let listaDeAlunos: Array<Aluno> = [];

      const querySelectAlunos = `SELECT * FROM aluno`;
      const respostaBD = await database.query(querySelectAlunos);

      respostaBD.rows.forEach((alunoBD: any) => {
        const novoAluno: Aluno = new Aluno(
          alunoBD.ra,
          alunoBD.nome,
          alunoBD.sobrenome,
          alunoBD.data_nascimento,
          alunoBD.endereco,
          alunoBD.email,
          alunoBD.celular
        );

        novoAluno.setIdAluno(alunoBD.id_aluno);
        listaDeAlunos.push(novoAluno);
      });

      return listaDeAlunos;
    } catch {
      return null;
    }
  }

  static async cadastrarAluno(aluno: AlunoDTO): Promise<boolean> {
    try {
      const queryInsertAluno = `INSERT INTO aluno (nome, sobrenome, data_nascimento, endereco, email, celular)
                                VALUES
                                ($1, $2, $3, $4, $5, $6)
                                RETURNING id_aluno;`;

      const respostaBD = await database.query(queryInsertAluno, [
        aluno.nome.toUpperCase(),
        aluno.sobrenome.toUpperCase(),
        aluno.dataNascimento,
        aluno.endereco,
        aluno.email,
        aluno.celular,
      ]);

      return respostaBD.rows.length > 0;
    } catch {
      return false;
    }
  }

  static async listarAluno(idAluno: number): Promise<Aluno | null> {
    try {
      const querySelectAlunos = `SELECT * FROM aluno WHERE id_aluno=$1;`;
      const respostaBD = await database.query(querySelectAlunos, [idAluno]);

      if (respostaBD.rowCount != 0) {
        const aluno: Aluno = new Aluno(
          respostaBD.rows[0].ra,
          respostaBD.rows[0].nome,
          respostaBD.rows[0].sobrenome,
          respostaBD.rows[0].data_nascimento,
          respostaBD.rows[0].endereco,
          respostaBD.rows[0].email,
          respostaBD.rows[0].celular
        );

        aluno.setIdAluno(respostaBD.rows[0].id_aluno);
        return aluno;
      }
      return null;
    } catch {
      return null;
    }
  }
}
export default Aluno;