const { PrimaClient } = require("@prisma/client");
const prisma = new PrimaClient();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

module.exports = {
  signin: async (req, res) => {
    try {
      const rows = await prisma.user.findFirst({
        where: {
            username: req.user.username,
            password: req.user.password,
            status : 'use'
        }
      });

         if (rows != null) {
            
         }



    } catch (e) {
      return res.status(500).send({ error: e.massage });
    }
  }
};
