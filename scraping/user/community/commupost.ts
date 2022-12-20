import { PrismaClient } from "@prisma/client";
import ps from "../../post/json/community.json";
interface post {
  text: string;
  time: string;
  img?: string;
}

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

const posts = ps as post[];
(async () => {
  const prisma = new PrismaClient();
  const users = await prisma.community_User.findMany({
    select: { userId: true, communityId: true },
  });

  for (let user of users) {
    const r = randomIntFromInterval(20, 30);
    for (let i = 0; i < r; i++) {
      try {
        const rpost = posts[Math.floor(Math.random() * posts.length)];
        const commu = await prisma.community_Post.create({
          data: {
            //   communityId: user.communityId,
            post: {
              create: {
                body: rpost.text,
                ...(rpost.img
                  ? { files: { create: { fileAddress: rpost.img } } }
                  : {}),
                lastEdit: new Date(rpost.time),
                postOwner: {
                  connect: { userId: user.userId },
                },
              },
            },
            community: { connect: { communityId: user.communityId } },
          },
        });
        console.log(commu);
      } catch (err) {
        console.log(err);
      }
    }
  }
})();
