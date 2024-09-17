const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();  // Corrected instantiation
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");


dotenv.config();

module.exports = {
  signIn: async (req, res) => {
    try {
      const { username , password } = req.body;
      const rows = await prisma.user.findFirst({
        where: {
            username: username,
            password: password,
            status : 'use'
        }
      });

         if (rows != null) {
            const key =  process.env.SECRET_KEY;
            const token = jwt.sign({ userId: rows.id }, key, { expiresIn: '30d' });
         return res.send({ token : token });
        
        }

         return res.status(401).send({ error: 'Invalid credentials' });

    } catch (e) {
      return res.status(500).send({ error: e.massage });
    }
  }
};