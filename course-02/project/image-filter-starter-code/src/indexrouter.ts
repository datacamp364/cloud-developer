import { Router, Request, Response } from 'express';
import { ImageRouter } from './imageprocessing/image.router';

const router: Router = Router();

router.use('/filteredimage', ImageRouter);

router.get('/', async (req: Request, res: Response) => {
    res.send(`V0`);
});

export const IndexRouter: Router = router;