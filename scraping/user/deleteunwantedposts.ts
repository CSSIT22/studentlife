import { PrismaClient } from "@prisma/client";

(async () => {
  const prisma = new PrismaClient();
  const filterWord = await prisma.filtered_Word.findMany({
    select: { word: true },
  });
  for (let fw of filterWord) {
    try {
      const posts = await prisma.student_Post.findMany({
        select: { postId: true },
        where: {
          body: {
            contains: fw.word,
          },
        },
      });

      for (let po of posts) {
        const del = await prisma.student_Post.delete({
          where: { postId: po.postId },
        });
        console.log(fw.word, " ", del.postId);
      }
    } catch (err) {
      console.log(err);
    }
  }
})();
