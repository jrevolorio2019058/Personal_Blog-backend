'use strict'

import bcryptjs from 'bcryptjs';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { dbConnection } from './mongo.js';

import User from '../src/user/user.model.js';

class Server{

    constructor() {
        
        this.app = express();
        this.port = process.env.PORT;

        this.middlewares();
        this.connectDB();
        this.defaultCredential();

    }

    async defaultCredential() {
        
        const defaultCredential = await User.findOne({ username: "admin" });

        if (!defaultCredential) {
            
            const defaultUser = new User({

                name: "admin",
                username: "admin",
                password: "Admin10!",
                email: "admin@gmail.com",
                role: "ADMIN_ROLE"

            })

            const salt = bcryptjs.genSaltSync();
            defaultUser.password = bcryptjs.hashSync(defaultUser.password, salt);

            await defaultUser.save();

            console.log('Default Creadentials have been created')

        } else {
            
            console.log('Error: The Default Credentials was already created')

        }
        
    }

    middlewares() {
        
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));

    }

    async connectDB() {
        
        await dbConnection();

    }

    listen() {
        
        this.app.listen(this.port, () => {
            
            console.log('Server running on port: ', this.port)

        })

    }

}

export default Server;