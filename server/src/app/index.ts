import express, { Express } from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import morgan from 'morgan'
import router from './router';

(() => {
    try {
        const app: Express = express();
        const port = process.env.PORT || 8080;

        app.use(cors())
        app.use(express.json({}))
        app.use(express.urlencoded({ extended: true }))
        app.options('*', cors())
        app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
        router.use(bodyParser.json())

        app.use(router)

        app.listen(port, () => {
            console.log(`⚡️[server] http://localhost:${port}`);
        })
    } catch (error) {
        console.log("[ERROR APP]: ", error)
    }
})()