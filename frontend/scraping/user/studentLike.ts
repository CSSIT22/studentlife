import { PrismaClient, Student_Post } from "@prisma/client";

(async () => {
  const prisma = new PrismaClient();
  const users = await prisma.user_Profile.findMany({
    select: { userId: true },
  });
  const reactions = await prisma.emote_Collection.findMany({
    select: { emoteId: true },
  });
  const random = () => Math.floor(Math.random() * reactions.length);
  const randomPost = () => Math.floor(Math.random() * (60 - 20) + 20);
  for (let user of users) {
    try {
      const randompost: Student_Post[] =
        await prisma.$queryRaw`SELECT "postId" FROM "Student_Post" WHERE "userId" != ${
          user.userId
        } ORDER BY RANDOM() LIMIT ${randomPost()}`;
      //   console.log(randompost);
      const reac = await prisma.student_Reacted.createMany({
        data: randompost.map((item) => ({
          emoteId: reactions[random()].emoteId,
          postId: item.postId,
          userId: user.userId,
        })),
      });
      console.log(reac);
    } catch (err) {
      console.log("Error ", err);
    }
  }
})();
