const { PrismaClient } = require("@prisma/client");
const { error } = require("console");
const prisma = new PrismaClient();

module.exports = {
  create: async (req, res) => {
    try {
      await prisma.foodType.create({
        data: {
          name: req.body.name,
          remark: req.body.remark ?? "",
          status: "use"
        }
      });
      return res.send({ massagge: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  list: async (req, res) => {
    try {
      const rows = await prisma.foodType.findMany({
        where: {
          status: "use"
        }
      });
      return res.send({ results: rows });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  remove: async (req, res) => {
    try {
      await prisma.foodType.update({
        data: {
          status: "delete"
        },
        where: {
          id: parseInt(req.params.id)
        }
      });

      return res.send({ message: "Delete success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  update: async (req, res) => {
    try {
      await prisma.foodType.update({
        data: {
          name: req.body.name,
          remark: req.body.remark
        },
        where: {
          id: req.body.id,
        }
      });
      return res.send({ message: "Update success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  }
};
