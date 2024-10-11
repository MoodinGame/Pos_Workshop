const { PrismaClient } = require("@prisma/client");
const { remove } = require("./FoodController");
const prisma = new PrismaClient();

module.exports = {
  create: async (req, res) => {
    try {
      // check
      const row = await prisma.Food.findFirst({
        where: {
          id: req.body.foodId
        }
      });

      const oldData = await prisma.saleTemp.findFirst({
        where: {
          userId: req.body.userId,
          foodId: req.body.foodId
        }
      });

      if (oldData == null) {
        await prisma.saleTemp.create({
          data: {
            foodId: req.body.foodId,
            qty: req.body.qty,
            price: row.price,
            userId: req.body.userId,
            tableNo: req.body.tableNo
          }
        });
      } else {
        await prisma.saleTemp.update({
          data: {
            qty: oldData.qty + 1
          },
          where: {
            id: oldData.id
          }
        });
      }

      return res.send({ message: "Success" });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  },
  list: async (req, res) => {
    try {
      const row = await prisma.saleTemp.findMany({
        include: {
          Food: true
        },
        where: {
          userId: parseInt(req.params.userId)
        },
        orderBy: {
          id: "desc"
        }
      });
      return res.send({ results: row });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  },
  clear: async (req, res) => {
    try {
      await prisma.saleTemp.deleteMany({
        where: {
          userId: parseInt(req.params.userId)
        }
      });
      return res.send({ message: "Success" });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  },
  remove: async (req, res) => {
    try {
      await prisma.saleTemp.deleteMany({
        where: {
          foodId: parseInt(req.params.foodId),
          userId: parseInt(req.params.userId)
        }
      });
      return res.send({ message: "Success" });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  },
  changeQty: async (req, res) => {
    try {
      const oldData = await prisma.saleTemp.findFirst({
        where: {
          id: req.body.id,
        },
      });

      let oldQty = oldData.qty;

      if (req.body.style == "up") {
        oldQty = oldQty + 1;
      
      } else {
        oldQty = oldQty - 1;
        if (oldQty < 0) {
          oldQty = 0;
        }
      }

      await prisma.saleTemp.update({
        data: {
          qty: oldQty,
        },
        where: {
          id: req.body.id,
        },
      });

      return res.send({ message: "Success" });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }
};
