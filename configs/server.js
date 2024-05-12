'use strict'

import bcryptjs from 'bcryptjs';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { dbConnection } from './mongo.js';


import Credentials from '../src/credentials/credentials.model.js';
import User from '../src/user/user.model.js';

import authRoutes from '../src/auth/auth.routes.js';
import postRoutes from '../src/post/post.routes.js';

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/personal-blog/v1/auth'
        this.postPath = '/personal-blog/v1/post'

        this.middlewares();
        this.connectDB();
        this.defaultCredential();
        this.routes();

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

            const ADMIN_ROLE = new Credentials({
                role: "ADMIN_ROLE"
            })

            const USER_ROLE = new Credentials({
                role: "USER_ROLE"
            })

            await ADMIN_ROLE.save();
            await USER_ROLE.save();

            console.log('Default Creadentials have been created')

        } else {

            console.log('Warning: The Default Credentials was already created')

        }

    }

    middlewares() {

        this.app.use(express.urlencoded({ extended: false }));
        // this.app.use(apiLimiter);
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));

    }

    async connectDB() {

        await dbConnection();

    }

    routes() {

        this.app.use(this.authPath, authRoutes);
        this.app.use(this.postPath, postRoutes);

    }

    listen() {

        this.app.listen(this.port, () => {

            console.log('Server running on port: ', this.port)

        })

    }

}

export default Server;