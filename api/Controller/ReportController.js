const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const dayjs = require("dayjs");

module.exports = {
    sumPerDayInYearAndMonth: async (req, res) => {
        try {
            const year = req.body.year;
            const month = req.body.month;

            // loop day from 1 to end of month
            const sumPerDay = [];
            const startDate = dayjs(year + '-' + month + '-01');
            const endDate = startDate.endOf('month');

            for (let day = startDate.date(); day <= endDate.date(); day++) {
                const dateFrom = startDate.date(day).format('YYYY-MM-DD');
                const dateTo = startDate.date(day).add(1, 'day').format('YYYY-MM-DD');

                // find all billSale in date
                const billSales = await prisma.billSale.findMany({
                    where: {
                        createdDate: {
                            gte: new Date(dateFrom),
                            lte: new Date(dateTo)
                        },
                        status: 'use'
                    },
                    include: {
                        BillSaleDetails: true
                    }
                })

                let sum = 0;

                for (let i = 0; i < billSales.length; i++) {
                    const billSaleDetails = billSales[i].BillSaleDetails;

                    for (let j = 0; j < billSaleDetails.length; j++) {
                        sum += billSaleDetails[j].price;
                    }
                }

                sumPerDay.push({
                    date: dateFrom,
                    amount: sum
                })
            }

            return res.send({ results: sumPerDay })
        } catch (e) {
            return res.status(500).send({ error: e.message })
        }
    }
};
