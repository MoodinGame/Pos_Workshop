const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient(); // Corrected instantiation
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  signin: async (req, res) => {
    try {
      const rows = await prisma.user.findFirst({
        select: {
          id: true,
          name: true,
          level: true,
        },
        where: {
          username: req.body.username,
          password: req.body.password,
          status: "use",
        },
      });

      if (rows != null) {
        const key = process.env.SECRET_KEY;
        const token = jwt.sign(rows, key, { expiresIn: "30d" });

        return res.send({ token: token, name: rows.name, id: rows.id });
      }

      return res.status(401).send({ message: "unauthorized" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  }
};
