import { Router } from "express";
import { check } from "express-validator";
import { existentPost } from "../helpers/db-validator.js";
import { validateFields} from "../middlewares/validate-fields.js";
import { addComment, listComment } from "./comment.controller.js";

const router = Router();

router.get('/', listComment);

router.post(
    '/',
    [
        check('creatorComment', "It's obligatory the postName").not().isEmpty(),
        check('titleComment', 'It is obligatory the postDescription').not().isEmpty(),
        check('descriptionComment', 'It is obligatory the postDescription').not().isEmpty(),
        check('postName', 'It is obligatory the postDescription').not().isEmpty(),
        check('postName').custom(existentPost),
        validateFields,
    ], addComment
);

export default router;