import { Socket } from "socket.io";
import socketIO from 'socket.io';


//Maneja cuando un usuario se desconecta
export const desconectar = (cliente: Socket)=>{
    //cuando un usuario se desconecta
cliente.on('disconnect', ()=>{
    //imprime 
    console.log("Cliente desconectado");
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