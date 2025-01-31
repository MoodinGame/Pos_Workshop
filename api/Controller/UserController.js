const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient(); // Corrected instantiation
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { list } = require("pdfkit");
const { remove } = require("./FoodTypeController");

dotenv.config();

module.exports = {
  signin: async (req, res) => {
    try {
      const rows = await prisma.user.findFirst({
        select: {
          id: true,
          name: true,
          level: true
        },
        where: {
          username: req.body.username,
          password: req.body.password,
          status: "use"
        }
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
  },
  list: async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        where: {
          status: "use"
        },
        orderBy: {
          id: "desc"
        }
      });

      return res.send({ results: users });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const user = await prisma.user.create({
        data: {
          name: req.body.name,
          username: req.body.username,
          password: req.body.password,
          level: req.body.level
        }
      });

      return res.send({ message: "success" });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const user = await prisma.user.update({
        where: {
          id: req.body.id
        },
        data: {
          name: req.body.name,
          username: req.body.username,
          password: req.body.password,
          level: req.body.level
        }
      });

      return res.send({ message: "success" });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
  remove: async (req, res) => {
    try {
      const user = await prisma.user.update({
        where: {
          id: parseInt(req.params.id)
        },
        data: {
          status: "delete"
        }
      });

      return res.send({ message: "success" });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
  getLevelFromToken: async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const level = decoded.level;

      return res.send({ level : level });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  }
};
