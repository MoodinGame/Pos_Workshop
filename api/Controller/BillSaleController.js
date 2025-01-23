const { PrismaClient } = require("@prisma/client");
const { remove } = require("./SaleTempController");
const prisma = new PrismaClient();


module.exports = {
    list: async (req, res) => {
        try {
            // select bill sale between date
            const billSale = await prisma.billSale.findMany({
                where: {
                    createdDate: {
                        gte: req.body.startDate,
                        lte: req.body.endDate
                    },
                    status: 'use'
                },
                include: {
                    BillSaleDetails: true,
                    User: true
                },
                orderBy: {
                    id: 'asc'
                }
            })

            return res.send({ results: billSale })
        } catch (e) {
            return res.status(500).send({ error: e.message })
        }
    } , remove: async(req , res ) => {
        try {
            const billSale = await prisma.billSale.update({
                where :{
                    id : parseInt(req.params.id)
                },
                data : {
                    status : "delete"
                }
            })
            return res.send({ results: billSale })
        } catch (error) {
            return res.status(500).json({ error : error.message})
        }
    }
};
