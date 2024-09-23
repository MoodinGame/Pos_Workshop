const { PrismaClient } = require("@prisma/client");
const { create } = require("./FoodTypeController");
const { error } = require("console");
const prisma = new PrismaClient();

module.exports = {
  create: async (req, res) => {
    try {
      await prisma.Food.create({
        data: {
          foodTypeId: req.body.foodTypeId,
          name: req.body.name,
          remark: req.body.remark,
          price: req.body.price,
          img: req.body.img,
          foodType: req.body.foodType,
          status: "use"
        }
      });
      return res.send({ message: "Success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },list: async (req, res) => {
    try {
      const rows = await prisma.food.findMany({
        where: {
          status: "use"
        }
      });
      return res.send({ results: rows });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  }
};
