import { Usuario } from "./usuario";

export class UsuarioLista {
         public lista: Usuario[] = [];
         constructor() {}
         //agregar usuario
         public agregar(usuario: Usuario) {
           this.lista.push(usuario);
           console.log(this.lista);
           return usuario;
         }
         //Actualiza nombre
         public actualizarNombre(id: string, nombre: string) {
           this.lista.forEach(usuario => {
             if ((usuario.id = id)) {
               usuario.nombre = nombre;
             }
           });
           console.log("Actualizando usuario");
           console.log(this.lista);
         }
         public ObtenerLista() {
           return this.lista;
         }
         public GetUsuario(id: string) {
           return this.lista.find(usuario => usuario.id === id);
         }

         public GetUsuarioEnSala(sala: string) {
           return this.lista.filter(usuario => usuario.sala === sala);
         }
     public BorrarUsuario(id: string) {
            const tempUser = this.GetUsuario(id);
            this.lista = this.lista.filter( usuario =>  usuario.id !== id);
            return tempUser;
         }
       }