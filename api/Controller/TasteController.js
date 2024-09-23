const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  create: async (req, res) => {
    try {
      await prisma.taste.create({
        data: {
          name: req.body.name,
          remark: req.body.remark,
          foodTypeId: req.body.foodTypeId,
          status: "use"
        }
      });
      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  },
  list: async (req, res) => {
    try {
      const rows = await prisma.taste.findMany({
        include: {
          FoodType: true
        },
        orderBy: {
          id: "desc"
        },
        where: {
          status: "use"
        }
      });
      return res.send({ results: rows });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  },
  remove: async (req, res) => {
    try {
      await prisma.taste.update({
        data: {
          status: "delete"
        },
        where: {
          id: parseInt(req.params.id)
        }
      });
      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  },
  update: async (req, res) => {
    try {
      await prisma.taste.update({
        data: {
          name: req.body.name,
          remark: req.body.remark,
          foodTypeId: req.body.foodTypeId
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
