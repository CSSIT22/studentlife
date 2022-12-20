import { PrismaClient } from "@prisma/client";

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

(async () => {
  const prisma = new PrismaClient();
  const communities = await prisma.community.findMany({
    select: { communityId: true },
  });

  for (let commu of communities) {
    try {
      const users: { userId: string }[] =
        await prisma.$queryRaw`SELECT "userId" FROM "User_Profile" ORDER BY RANDOM() LIMIT ${randomIntFromInterval(
          30,
          100
        )}`;
      const c = await prisma.community_User.createMany({
        data: users.map((item) => ({
          communityId: commu.communityId,
          roleId: "clavjs04i0004v32wxmjn3kvk",
          userId: item.userId,
          joined: randomDate(new Date(2022, 0, 1), new Date()),
        })),
      });
      console.log(c);
    } catch (err) {
      console.log(err);
    }
  }
})();
