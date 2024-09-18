const { PrismaClient } = require("@prisma/client");
const { error } = require("console");
const prisma = new PrismaClient();

module.exports = {
  create: async (req, res) => {
    try {
      await prisma.FoodType.create({
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
    const rows = await prisma.FoodType.findMany({
    where: {
      status: "use"
    }
    })
    return res.send({  results: rows });
   } catch (e) {
    return res.status(500).send({ error: e.message });
   }
  }
}