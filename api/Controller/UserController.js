const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient(); // Corrected instantiation
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  signIn: async (req, res) => {
    try {
      const { username, password } = req.body;
      const rows = await prisma.user.findFirst({
        select: {
          id: true,
          name: true,
          level: true
        },
        where: {
          username: username,
          password: password,
          status: "use"
        }
      });

      if (rows != null) {
        const key = process.env.SECRET_KEY;
        const token = jwt.sign(rows, key, { expiresIn: "30d" });
        return res.send({ token: token, name: rows.name, id: rows.id });
      }

      return res.status(401).send({ error: "Invalid credentials" });
    } catch (e) {
      return res.status(500).send({ error: e.massage });
    }
  }
};
