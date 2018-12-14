import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsuarioLista } from '../classes/usuario-lista';
import { Usuario } from '../classes/usuario';

export const usuarios_conectados = new UsuarioLista();

export const conectar_cliente = (cliente: Socket)=>{
    const usuario = new Usuario( cliente.id );
    usuarios_conectados.agregar( usuario );


}
//Maneja cuando un usuario se desconecta
export const desconectar = (cliente: Socket)=>{
    //cuando un usuario se desconecta
    cliente.on('disconnect', ()=>{
        //imprime 
        let usuario_desc = usuarios_conectados.BorrarUsuario( cliente.id );
        console.log("Cliente desconectado ", usuario_desc );
    })
}

//escuchar mensajes
export const mensaje = (cliente: Socket, io:socketIO.Server) =>{
    //cuando el cliente emmite el evento mensaje
    cliente.on('mensaje', (payload: {de: string, cuerpo: string})=>{
        //imprime el mensaje
        console.log('Mensaje recibido: ', payload );
        
        io.emit('mensaje-nuevo', payload);
    })

}

export const config_user = (cliente: Socket) => {
    cliente.on("configurar-usuario", (payload, callback)=> {
        usuarios_conectados.actualizarNombre(cliente.id, payload.nombre);
        callback({
            ok:true,
            mensaje: "Cliente "+ payload.nombre +" configurado"
        })
    });

}