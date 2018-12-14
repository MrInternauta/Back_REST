import {Router, Request, Response} from 'express';
import Server from '../classes/server';
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

export default router;

