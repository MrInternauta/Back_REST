import {Router, Request, Response} from 'express';
import Server from '../classes/server';
import { usuarios_conectados } from '../sockets/sockets';
export const router = Router();

router.post('/mensajes',(req: Request, res: Response)=>{
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const payload = {
        de,
        cuerpo
    }
    const server =  Server.instances;
    server.io.emit('mensaje-nuevo', payload);
    res.json({
        ok: true,
        message: "Todo esta bien."
    })
})

router.post('/mensajes/:id',(req: Request, res: Response)=>{
    const id = req.params.id;
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const payload = {
        de,
        cuerpo
    }
    const server  = Server.instances;
    server.io.in(id).emit('mensaje-privado', payload)
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    })
})

//Servicio para obtener los Id de lo usuarios
router.get('/usuarios', (req: Request, res: Response) => {

    const server = Server.instances;
    server.io.clients( ( err: any , clients: string[] )=>{
        if(err){
            return res.json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            clients
        })
    })

    
})

//usuarios y sus nombres
router.get('/usuarios/detalle', (req: Request, res: Response) => {

    const server = Server.instances;
    server.io.clients((err: any, clients: string[]) => {
        if (err) {
            return res.json({
                ok: false,
                err
            })
        }
        res.json({
            ok:true,
            clientes: usuarios_conectados.ObtenerLista()
        })
       
    })



    
})

export default router;

