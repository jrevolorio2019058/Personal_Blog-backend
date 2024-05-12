import { Router } from "express";
import { check } from "express-validator";
// import { validationPassword } from "../helpers/data-validator.js";
import { existenUser } from "../helpers/db-validator.js";
import {validateJWT} from "../middlewares/validate-jwt.js"
import { validateFields} from "../middlewares/validate-fields.js";
import { addPost } from "./post.controller.js";

const router = Router();

router.post(
    '/',
    [
        validateJWT,
        check('postName', "It's obligatory the postName").not().isEmpty(),
        check('postDescription', 'It is obligatory the postDescription').not().isEmpty(),
        check('nameComments').custom(existenUser),
        validateFields,
    ], addPost
);

export default router;