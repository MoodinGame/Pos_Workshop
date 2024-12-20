const { PrismaClient } = require("@prisma/client");
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
          Food: true,
          SaleTempDetails: true
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
      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  remove: async (req, res) => {
    try {
      const saleTemps = await prisma.saleTemp.findMany({
        include: {
          SaleTempDetails: true
        },
        where: {
          userId: parseInt(req.params.userId),
          foodId: parseInt(req.params.foodId)
        }
      });

      console.log(saleTemps);

      for (let i = 0; i < saleTemps.length; i++) {
        if (saleTemps[i].SaleTempDetails.length > 0) {
          const saleTempId = saleTemps[i].id;

          await prisma.saleTempDetail.deleteMany({
            where: {
              saleTempId: saleTempId
            }
          });
        }
      }
      await prisma.saleTemp.deleteMany({
        where: {
          userId: parseInt(req.params.userId),
          foodId: parseInt(req.params.foodId)
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
          id: req.body.id
        }
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
          qty: oldQty
        },
        where: {
          id: req.body.id
        }
      });

      return res.send({ message: "Success" });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  },
  createDetail: async (req, res) => {
    try {
      const qty = req.body.qty;
      const foodId = req.body.foodId;
      const saleTempId = req.body.saleTempId;

      const oldData = await prisma.saleTempDetail.findFirst({
        where: {
          foodId: foodId,
          saleTempId: saleTempId
        }
      });

      if (oldData == null) {
        for (let i = 0; i < qty; i++) {
          await prisma.saleTempDetail.create({
            data: {
              foodId: foodId,
              saleTempId: saleTempId
            }
          });
        }
      }
      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  listSaleTempDetail: async (req, res) => {
    try {
      const rows = await prisma.saleTempDetail.findMany({
        include: {
          Food: true
        },
        where: {
          saleTempId: parseInt(req.params.saleTempId)
        },
        orderBy: {
          id: "desc"
        }
      });

      const arr = [];

      for (let i = 0; i < rows.length; i++) {
        const item = rows[i];

        if (item.tasteId != null) {
          const taste = await prisma.taste.findFirst({
            where: {
              id: item.tasteId
            }
          });
          item.tasteName = taste.name;
        }
        arr.push(item);
      }
      return res.send({ results: arr });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  },
  updateFoodSize: async (req, res) => {
    try {
      const foodSize = await prisma.foodSize.findFirst({
        where: {
          id: req.body.foodSizeId
        }
      });

      await prisma.saleTempDetail.update({
        data: {
          addedMoney: foodSize.moneyAdded
        },
        where: {
          id: req.body.saleTempId
        }
      });

      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  },
  updateTaste: async (req, res) => {
    try {
      await prisma.saleTempDetail.update({
        data: {
          tasteId: req.body.tasteId
        },
        where: {
          id: req.body.saleTempId
        }
      });
      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  },
  newSaleTempDetail: async (req, res) => {
    try {
      await prisma.saleTempDetail.create({
        data: {
          saleTempId: req.body.saleTempId,
          foodId: req.body.foodId
        }
      });
      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  },
  removeSaleTempDetail: async (req, res) => {
    try {
      await prisma.saleTempDetail.delete({
        where: {
          id: parseInt(req.params.id)
        }
      });
      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }
};
