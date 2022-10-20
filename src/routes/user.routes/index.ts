import { Router } from "express";
import userController from "../../controllers/userController";
import routerAdapter from "../routerAdapter";
import { verifyAuthentication } from "../../middleware/jwt/verifyAuthentication";
import { loginValidation, registerValidation } from "../../middleware/yup/userValidate";

const router: Router = Router();

router.post("/", registerValidation, routerAdapter(userController.create));
router.get("/login", loginValidation, routerAdapter(userController.login));
router.get("/perfil", verifyAuthentication, routerAdapter(userController.perfil));

export default router;