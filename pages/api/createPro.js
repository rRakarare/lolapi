import prisma from "../../lib/prisma"


export default async function handler(req, res) {




    const antwort = await prisma.lolpro.create({
        data: {
            name: req.body.data
        }
    })

    res.json(antwort)
  
}
