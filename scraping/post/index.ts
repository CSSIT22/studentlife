import { PrismaClient } from "@prisma/client";
import startBrowser from "../util/browser";
import fs from "fs";
import path from "path";

(async () => {
  const prisma = new PrismaClient();
  //   const data = await prisma.user_Profile.findMany();
  const browser = await startBrowser();
  const page = await browser.newPage();
  let result: any = [];
  await page.goto(
    "https://twitter.com/i/flow/login"
    // "https://twitter.com/search?q=%22Mr%20Beast%22&src=trend_click&vertical=trends"
  );

  // console.log("Waiting for article");

  await page.waitForSelector("div[data-testid=tweetText]", {
    timeout: 5000000,
  });

  // await page.waitForSelector("div[data-testid=sheetDialog]");

  // await page.$$eval("div[data-testid=sheetDialog]", (el)=>{
  //   page.$$("")
  // })

  // await page.click(
  //   "div.css-18t94o4.css-1dbjc4n.r-1niwhzg.r-sdzlij.r-1phboty.r-rs99b7.r-1wzrnnt.r-19yznuf.r-64el8z.r-1ny4l3l.r-1dye5f7.r-o7ynqc.r-6416eg.r-lrvibr"
  // );
  let scroll = 0;
  const timer = setInterval(async () => {
    const eee = await page.$$eval("article[data-testid=tweet]", (links) => {
      const content = links.map((item) => {
        const text = item.querySelector(
          "div[data-testid=tweetText]"
        )?.textContent;
        const img = item
          .querySelector("div[data-testid=tweetPhoto]")
          ?.getElementsByTagName("img")[0]?.src;
        const time = item.getElementsByTagName("time")[0]?.dateTime || null;
        console.log(time);
        // const img =
        //   document
        //     .querySelectorAll(`#${item.id}`)[1]
        //     ?.getElementsByTagName("img")[0]?.src || null;
        // const img = item.getElementsByTagName("img")[0]?.src || null;
        return { text, img, time };
      });
      // await page.evaluate(()=>{})
      return content;
    });

    const scrolllist = await page.$$eval(
      "div[data-testid=cellInnerDiv]",

      (el) => {
        const scrolllist = el.map((e) => {
          console.log(e.offsetHeight);
          console.log(e);
          window.scrollBy(0, e.offsetHeight * 2);

          return e.offsetHeight;
        });
        return scrolllist;
      }
    );
    // let scr = 0;

    // await page.evaluate(() => {
    // scrolllist.forEach((i) => window.scrollTo(0, scr););

    // });

    // console.log(eee);
    result.push(...eee);
  }, 8000);

  await new Promise((res) => setTimeout(res, 30 * 60 * 1000));

  clearInterval(timer);

  console.log("Here comes articles");

  fs.writeFileSync(
    path.join(__dirname, "/json/community.json"),
    JSON.stringify(result, null, 2)
  );
  // fs.writeFile("./json/result.json", JSON.stringify(result), "utf-8", () => {
  //   console.log("Done !");
  // });

  //   console.log(data);
})();
