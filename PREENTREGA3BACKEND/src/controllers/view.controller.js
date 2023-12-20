export const home = async (req, res) => {
    try {
      res.redirect("/login");
    } catch (err) {
      console.log(err);
    }
  };
  export const login = async (req, res) => {
    try {
      res.render("login", { style: "styles.css" });
    } catch (err) {
      console.log(err);
    }
  };
  export const register = async (req, res) => {
    try {
      res.render("register", { style: "styles.css" });
    } catch (err) {
      console.log(err);
    }
  };
  export const recover = async (req, res) => {
    try {
      res.render("recover", { style: "styles.css" });
    } catch (err) {
      console.log(err);
    }
  };
  export const profile = async (req, res) => {
    try {
      const user = req.session.user;
      res.status(200).render("profile", {
        style: "styles.css",
        user,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const admin = async (req, res) => {
    try {
      const user = req.session.user;
      res.status(200).render("admin", {
        style: "styles.css",
        user,
      });
    } catch (err) {
      console.log(err);
    }
  };