export interface LivroDTO {
  idLivro?: string;
  titulo: string;
  autor: string;
  editora: string;
  anoPublicacao: number;
  isbn: string;
  quantTotal: number;
  quantDisponivel: number;
  valorAquisicao: number;
  statusLivroEmprestado: string;
}