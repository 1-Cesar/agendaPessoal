import { Foto } from './Foto';
import { Endereco } from './Endereco';

export class Pessoa {
    public cpf: string
    public id: number
    public nome: string
    public endereco: Endereco = new Endereco()    
}