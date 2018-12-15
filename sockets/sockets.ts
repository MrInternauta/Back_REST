import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsuarioLista } from '../classes/usuario-lista';
import { Usuario } from '../classes/usuario';

export const usuarios_conectados = new UsuarioLista();

export const conectar_cliente = (cliente: Socket, io:SocketIO.Server )=>{
    const usuario = new Usuario( cliente.id );
    usuarios_conectados.agregar( usuario );

}
//Maneja cuando un usuario se desconecta
export const desconectar = (cliente: Socket, io:socketIO.Server)=>{
    //cuando un usuario se desconecta
    cliente.on('disconnect', ()=>{
        //imprime 
        usuarios_conectados.BorrarUsuario( cliente.id );
        io.emit("usuarios-activos", usuarios_conectados.ObtenerLista());

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

export const config_user = (cliente: Socket, io: socketIO.Server) => {
    cliente.on("configurar-usuario", (payload, callback)=> {
        usuarios_conectados.actualizarNombre(cliente.id, payload.nombre);
        io.emit("usuarios-activos", usuarios_conectados.ObtenerLista());

        callback({
            ok:true,
            mensaje: "Cliente "+ payload.nombre +" configurado"
        })

    });

}

export const lista_usuarios = (cliente: Socket, io: socketIO.Server) => {
         cliente.on("obtener-usuarios", () => {
           io.to(cliente.id).emit("usuarios-activos", usuarios_conectados.ObtenerLista());
         });
       };

//enviar los usuarios
/*export const lista_usuarios = (cliente: Socket, io: socketIO.Server) => {
    io.in(cliente.id).emit("usuarios-activos", usuarios_conectados.ObtenerLista());
}*/

