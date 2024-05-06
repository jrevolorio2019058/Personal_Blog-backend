import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields.js";
import { login } from "./auth.controller.js";

const router = Router();

router.post(
    '/login',
    [
        check('usernameOrEmail', "It's obligatory a username or a email").not().isEmpty(),
        check('password', 'Password is obligatory').not().isEmpty(),
        validateFields,
    ],login
);

export default router;