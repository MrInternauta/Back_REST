import {Router, Request, Response} from 'express';
export const router = Router();

router.get('/mensajes',(req: Request, res: Response)=>{
    res.json({
        ok: true,
        message: "Todo esta bien."
    })
})

router.post('/mensajes/:id',(req: Request, res: Response)=>{
    const id = req.params.id;
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    })
})

export default router;

