import express, { Request, Response } from "express";
const router = express.Router();

import customers from "../modules/index"

router.get('/', (req: Request, res: Response) => {
    return res.json({
        status: true,
        message: 'Api is running'
    });
});

router.use(customers)

export default router