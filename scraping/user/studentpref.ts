import { PrismaClient } from "@prisma/client";
function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

(async () => {
  const arr = [
    "CODING",
    "FOOTBALL",
    "GUTAR",
    "MUSIC",
    "READING",
    "LEARNING",
    "GAMING",
    "EATING",
    "TRAVELING",
  ];
  const se = ["Male", "Female", "LGBTQ+"];

  const prisma = new PrismaClient();
  const detailuserid = await prisma.detail.findMany({
    select: { userId: true },
  });
  const users = await prisma.user_Profile.findMany({
    where: { userId: { notIn: detailuserid.map((i) => i.userId) } },
    select: { userId: true },
  });

  for (let user of users) {
    const rhobby = arr[Math.floor(Math.random() * arr.length)];
    const rsex = se[Math.floor(Math.random() * se.length)];
    try {
      const detail = await prisma.detail.create({
        data: {
          address: "KMUTT PRACHAUTHID",
          birth: randomDate(new Date("2004-1-1"), new Date("2001-1-1")),
          hobby: rhobby,
          phone: "09093611xx",
          sex: rsex,
          userId: user.userId,
        },
      });
      console.log(detail);
    } catch (err) {
      console.log(err);
    }
  }
})();
