'use strict'

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

class Server{

    constructor() {
        
        this.app = express();
        this.port = process.env.PORT;

        this.middlewares();

    }

    middlewares() {
        
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));

    }

    listen() {
        
        this.app.listen(this.port, () => {
            
            console.log('Server running on port: ', this.port)

        })

    }

}

export default Server;