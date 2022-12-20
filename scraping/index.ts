import { PrismaClient } from "@prisma/client";
import startBrowser from "./util/browser";

(async () => {
  const prisma = new PrismaClient();
  //   const data = await prisma.user_Profile.findMany();
  const browser = await startBrowser();
  const page = await browser.newPage();
  await page.goto(
    "https://twitter.com/search?q=%23%E0%B8%9D%E0%B8%99%E0%B8%94%E0%B8%B2%E0%B8%A7%E0%B8%95%E0%B8%81%E0%B9%80%E0%B8%88%E0%B8%A1%E0%B8%B4%E0%B8%99%E0%B8%B4%E0%B8%94%E0%B8%AA%E0%B9%8C&src=trend_click&vertical=trends"
  );

  console.log("Waiting for article");

  await page.waitForSelector("div[data-testid=tweetText]");

  console.log("Here comes articles");

  const eee = await page.$$eval("div[data-testid=tweetText]", (links) => {
    const content = links.map((item) => item.textContent);
    return content;
  });
  console.log(eee);

  //   console.log(data);
})();
