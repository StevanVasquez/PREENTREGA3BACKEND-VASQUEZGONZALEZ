import { Router } from "express";
import { home, login, profile, recover, register, admin } from "../controllers/view.controller.js";

const router = Router();

router.get("/", home);
router.get("/login", login);
router.get("/register", register);
router.get("/recover", recover);
router.get("/profile", profile);
router.get("/admin", admin);

export default router;