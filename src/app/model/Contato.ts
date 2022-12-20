import { Usuario } from './Usuario';
import { Pessoa } from './Pessoa';

export class Contato {
    public email: string
    public id: number
    public privado: boolean
    public tag: string
    public telefone: string
    public tipoContato: string
    public pessoa: Pessoa = new Pessoa()
    public usuario: Usuario = new Usuario()
}