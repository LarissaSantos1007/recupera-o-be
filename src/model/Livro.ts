import type { LivroDTO } from "../interface/LivroDTO.js";
import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

class Livro {
  private idLivro: number = 0;
  private titulo: string;
  private autor: string;
  private editora: string;
  private anoPublicacao: number;
  private isbn: number;
  private quantTotal: number;
  private quantDisponivel: number;
  private valorAquisicao: number;
  private statusLivroEmprestado: string;

  constructor(
    _titulo: string,
    _autor: string,
    _editora: string,
    _anoPublicacao: number,
    _isbn: number,
    _quantTotal: number,
    _quantDisponivel: number,
    _valorAquisicao: number,
    _statusLivroEmprestado: string
  ) {
    this.titulo = _titulo;
    this.autor = _autor;
    this.editora = _editora;
    this.anoPublicacao = _anoPublicacao;
    this.isbn = _isbn;
    this.quantTotal = _quantTotal;
    this.quantDisponivel = _quantDisponivel;
    this.valorAquisicao = _valorAquisicao;
    this.statusLivroEmprestado = _statusLivroEmprestado;
  }

  public getIdLivro(): number {
    return this.idLivro;
  }
  public setIdLivro(_idLivro: number): void {
    this.idLivro = _idLivro;
  }

  public getTitulo(): string {
    return this.titulo;
  }
  public setTitulo(_titulo: string): void {
    this.titulo = _titulo;
  }

  public getAutor(): string {
    return this.autor;
  }
  public setAutor(_autor: string) {
    this.autor = _autor;
  }

  public getEditora(): string {
    return this.editora;
  }
  public setEditora(_editora: string) {
    this.editora = _editora;
  }

  public getAnoPublicacao(): number {
    return this.anoPublicacao;
  }
  public setAnoPublicacao(_anoPublicacao: number) {
    this.anoPublicacao = _anoPublicacao;
  }

  public getIsbn(): number {
    return this.isbn;
  }
  public setIsbn(_isbn: number) {
    this.isbn = _isbn;
  }

  public getQuantTotal(): number {
    return this.quantTotal;
  }
  public setQuantTotal(_quantTotal: number) {
    this.quantTotal = _quantTotal;
  }

  public getQuantDisponivel(): number {
    return this.quantDisponivel;
  }
  public setQuantDisponivel(_quantDisponivel: number) {
    this.quantDisponivel = _quantDisponivel;
  }

  public getValorAquisicao(): number {
    return this.valorAquisicao;
  }
  public setValorAquisicao(_valorAquisicao: number) {
    this.valorAquisicao = _valorAquisicao;
  }

  public getStatusLivroEmprestado(): string {
    return this.statusLivroEmprestado;
  }
  public setStatusLivroEmprestado(_statusLivroEmprestado: string) {
    this.statusLivroEmprestado = _statusLivroEmprestado;
  }

  static async listarLivros(): Promise<Array<Livro> | null> {
    try {
      let listaDeLivros: Array<Livro> = [];

      const querySelectLivros = `SELECT * FROM livro`;

      const respostaBD = await database.query(querySelectLivros);

      respostaBD.rows.forEach((livroBD: any) => {
        const novoLivro: Livro = new Livro(
          livroBD.titulo,
          livroBD.autor,
          livroBD.editora,
          livroBD.ano_publicacao,
          livroBD.isbn,
          livroBD.quant_total,
          livroBD.quant_disponivel,
          livroBD.valor_aquisicao,
          livroBD.status_livro_emprestado
        );

        novoLivro.setIdLivro(livroBD.id_livro);

        listaDeLivros.push(novoLivro);
      });

      return listaDeLivros;
    } catch (error) {
      console.error(`Erro ao acessar o banco de dados. ${error}`);
      return null;
    }
  }

  static async cadastrarLivro(livro: LivroDTO): Promise<boolean> {
    try {
      const queryInsertLivro = `INSERT INTO livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado)
                                VALUES
                                ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                                RETURNING id_livro;`;

      const respostaBD = await database.query(queryInsertLivro, [
        livro.titulo.toUpperCase(),
        livro.autor.toUpperCase(),
        livro.editora.toUpperCase(),
        livro.anoPublicacao,
        livro.isbn,
        livro.quantTotal,
        livro.quantDisponivel,
        livro.valorAquisicao,
        livro.statusLivroEmprestado,
      ]);
      if (respostaBD.rows.length > 0) {
        console.info(
          `Livro cadastrado com sucesso. ID: ${respostaBD.rows[0].id_livro}`
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error(`Erro na consulta ao banco de dados. ${error}`);
      return false;
    }
  }
}
export default Livro;