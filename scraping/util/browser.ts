import puppeteer, { Browser } from "puppeteer";
const startBrowser: () => Promise<Browser> = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--disable-setuid-sandbox"],
      ignoreHTTPSErrors: true,
    });
    return browser;
  } catch (err: any) {
    console.log("Error Starting browser");
    return err;
  }
};

export default startBrowser;
