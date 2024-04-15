import express from 'express';
import { CustomerHandle } from './handle';

const router = express.Router();

router.post("/clients", CustomerHandle.create)
router.get("/clients", CustomerHandle.findMany)



// create - listo
// find many - all data - listo

// search - shared key, name, phone number, email, range date


export default router