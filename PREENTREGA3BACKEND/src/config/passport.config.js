import passport from "passport";
import jwt from "passport-jwt";
import GitHubStrategy from "passport-github2";
import { SECRET_JWT, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "./config.js";
import { cookieExtractor } from "../utils/jwt.js";
import { SessionService } from "../repositories/index.js";

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: SECRET_JWT,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecert: GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/session/github/callback",
      },
      async (accesToken, refreshToken, profile, done) => {
        try {
          let user = await SessionService.findOne({
            email: profile._json?.email,
          });

          if (!user) {
            let addNewUser = {
              first_name: profile._json.name,
              last_name: "",
              email: profile._json.email,
              age: 0,
              password: "",
            };

            let newUser = await userModel.create(addNewUser);
            done(null, newUser);
          } else {
            done(null, user);
          }
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};

export default initializePassport;
