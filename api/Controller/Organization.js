const {PrismaClient} = require('@prisma/client');
const { create } = require('domain');
const prisma = new PrismaClient();



module.exports = {

    create : async (req , res ) => {
       try {
     
        const organization = await prisma.organization.findFrist();
        const playload = {
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone ?? '',
            email: req.body.email ?? '',
            taxCode: req.body.taxCode ?? '',
            logo: req.body.logo ?? organization.logo ?? '',
            website: req.body.website ?? '',
            promptPay: req.body.promptPay ?? ''
        }
          
        if (organization) {
          await prisma.organization.update({
            where : {
                id : organization.id
            },
            data : playload
          })
        }else{
            await prisma.organization.create({
                data : playload
            })
        }

        return res.send({message : "Success"})

       } catch (e) {
        return res.status(500).send({ error: e.message });
       }

    },
    info : async (req , res ) => {
        try {
           const row = await prisma.organization.findMany();
           return res.send(row[0] ?? {}) ;
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }



};