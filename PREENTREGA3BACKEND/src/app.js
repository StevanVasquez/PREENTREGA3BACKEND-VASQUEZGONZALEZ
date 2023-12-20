import express from "express";
import passport from "passport";
import displayRoutes from "express-routemap";
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";
import cors from "cors";
import { PORT } from "./config/config.js";
import __dirname from "./utils.js";
import initializePassport from "./config/passport.config.js";
import cartRoutes from "./routes/carts.routes.js";
import productRoutes from "./routes/products.routes.js";
import sessionRoutes from "./routes/sessions.routes.js";
import viewsRoutes from "./routes/views.routes.js";

const app = express();
const PORT_APP = PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]}));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

initializePassport();
app.use(passport.initialize());

app.use("/", viewsRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sessions", sessionRoutes);

app.listen(PORT_APP, () => {
  displayRoutes(app);
  console.log(`Listening on ${PORT_APP}`);
});