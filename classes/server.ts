import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';
export default class Server {
    private static _instance: Server;

    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpserver: http.Server;
    
    private constructor(){
        //Inicia servidor
        this.app = express();
        this.port =  SERVER_PORT;
        this.httpserver = new http.Server(this.app);
        this.io = socketIO( this.httpserver );
        this.escucharsockets();


    }

    public static get instances(){
        return this._instance || (this._instance = new this());
    }
    // escucha los eventos
    private escucharsockets (){
        // escucha las conexxiones
        console.log("Escuchando conexiones - sockets");
        //cuando se concta un cliente
        this.io.on('connection', client=>{
            //conectar cliente
            socket.conectar_cliente(client);
            socket.config_user(client);

            console.log(client.id);

            //CUANDO EL CLIENTE ENVIA MENSAJE esta escuchando el menaje
            socket.mensaje(client, this.io);
            
            //cuando se desconecta manda a llamar a la funcion
            socket.desconectar(client);
        })

    }
    //Iniciar servidor
    start( callback: Function ){
        this.httpserver.listen(this.port, callback);
    }


}