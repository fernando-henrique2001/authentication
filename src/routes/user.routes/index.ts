import { Router } from "express";
import userController from "../../controllers/userController";
import routerAdapter from "../routerAdapter";
import { verifyAuthentication } from "../../middleware/jwt/verifyAuthentication";

const router: Router = Router();

router.post("/", routerAdapter(userController.create));
router.get("/login", routerAdapter(userController.login));
router.get("/perfil", verifyAuthentication, routerAdapter(userController.perfil));

export default router;