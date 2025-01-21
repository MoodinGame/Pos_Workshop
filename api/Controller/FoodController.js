const { PrismaClient } = require('@prisma/client');
const { create } = require('domain');
const prisma = new PrismaClient();

module.exports = {
  create: async (req, res) => {
    try {
      await prisma.food.create({
        data: {
          foodTypeId: req.body.foodTypeId,
          name: req.body.name,
          remark: req.body.remark,
          price: req.body.price,
          img: req.body.img ?? "",
          foodType: req.body.foodType,
          status: "use"
        }
      });
      return res.send({ message: "Success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  list: async (req, res) => {
    try {
      const rows = await prisma.food.findMany({
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
      return res.status(500).send({ error: e.message });
    }
  },
  upload: async (req, res) => {
    try {
      if (req.files.img !== undefined) {
        const img = req.files.img;
        const fileName = img.name;

        img.mv("uploads/" + fileName, (err) => {
          if (err) {
            res.send({ error: err });
          }
        });
        return res.send({ fileName: fileName });
      } else {
        return res.send({ message: "No file uploaded" });
      }
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  remove: async (req, res) => {
    try {
      await prisma.food.update({
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
      let img = req.body.img;
      if (img === undefined) {
        const row = await prisma.food.findFirst({
          where: {
            id: req.body.id
          }
        });
        img = row.img;
      }

      await prisma.food.update({
        data: {
          foodType: req.body.foodType,
          foodTypeId: req.body.foodTypeId,
          name: req.body.name,
          remark: req.body.remark,
          price: req.body.price,
          img: img
        },
        where: {
          id: req.body.id
        }
      });

      return res.send({ message: "Update success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  filter: async (req, res) => {
    try {
      const rows = await prisma.food.findMany({
        include: {
          FoodType: true
        },
        where: {
          foodType: req.params.foodType,
          status: "use"
        },
        orderBy: {
          id: "desc"
        }
      });
      return res.send({ results: rows });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  search: async (req, res) => {
    try {
      const rows = await prisma.food.findMany({
        include: {
          FoodType: true
        },
        where: {
          OR: [
            { name: { contains: req.query.keyword, mode: "insensitive" } },
            { foodTypeId: parseInt(req.query.foodTypeId) }
          ],
          status: "use"
        },
        orderBy: {
          id: "desc"
        }
      });
      return res.send({ results: rows });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  }
};
