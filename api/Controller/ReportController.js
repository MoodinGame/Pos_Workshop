const { Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  
    sumPerDayInYearAndMonth : async (req, res) => {
        const { year, month } = req.body;
        const sumPerDay = [];
        const startDate = new Date(`${year}-${month}-01`);
        const endDate = startDate.endOf('month');

        for ( let day = startDate.Date(); day <= endDate.Date(); day++ ){
            const dateForm = startDate.Date(day).format('YYYY-MM-DD');
            const dateTo = startDate.Dtae(day).add(1, 'day').formate('YYYY-MM-DD');

            


        }

    },



};


