import { Router } from "express";
import { getCurrentUser, getGithubUser, githubLogin, registerUser, userLogin, userLogout } from "../controllers/session.controller.js";
import { passportCall } from "../utils/jwt.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", userLogin);
router.get("/logout", passportCall("jwt"), userLogout);
router.get("/current", passportCall("jwt"), getCurrentUser);
router.get("/github", passportCall("github"), githubLogin);
router.get("/github/callback", passportCall("github"), getGithubUser);

export default router;