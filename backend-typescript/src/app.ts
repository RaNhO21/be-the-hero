import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connection from "./database/connection";

//
// const app = express()
// app.use(express.json());
// app.use(cors());

//

class App {
    public express: express.Application

    public constructor() {
        this.express = express();

        this.middlewares();
        this.database();
        this.routes();
    }

    public middlewares(): void {
        this.express.use(express.json());
        this.express.use(cors());
    }

    private database(): promise<any> {
        return connection;
    }

    private routes(): void {
        this.express.get('/', (req, res) => {
            return res.send('Hello World');
        })
    }
}

export default new App().express;
