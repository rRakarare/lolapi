import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  const data = req.body;

  const existingProAccount = await prisma.proAccounts.findFirst({
    where: {
      name: data.account.name,
    },
  });

  if (existingProAccount) {
    for (const match of data.matches) {
        console.log(match)
      try {
        const res = await prisma.proMatches.create({
            data: {
              matchId: match.matchId,                
              proAccountsId: existingProAccount.id,
            
            },
          });
      } catch (err) {

      }
    }
  } else {
    await prisma.proAccounts.create({
      data: {
        puuid: data.account.puuid,
        name: data.account.name,
        lolproId: data.proid,
        matches: {
          createMany: { data: data.matches },
        },
      },
    });
  }
}
