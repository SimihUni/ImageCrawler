import queries from "./db/queries.js";
import { parse } from "node-html-parser";

import imageContentType from './imageContentTypes.json' with { type: 'json' };

async function cronTask(timeoutLength = 5000, redirectPolicy = "follow") {
  console.log("Cron job executed at:", new Date().toISOString());
  const count = await queries.getURLsCount();
  console.log("Total active URLs:", count);
  const urls = await queries.getURLs();
  console.log("Fetched URLs:", urls);
  if (urls.length === 0) {
    console.log("No URLs to process.");
    return Promise.resolve("No URLs found");
  }

  for (const url of urls) {
    let imageCount = 0;
    if (!url || !url.url) {
      console.error("Invalid URL object:", url);
      continue;
    }
    if (!url.url.startsWith("http")) {
      console.warn("Skipping non-HTTP URL:", url.url);
      continue;
    }

    const res = await fetch(url.url, {
      redirect: redirectPolicy,
      signal: AbortSignal.timeout(timeoutLength),
    });

    if (!res.ok) {
      console.error("Failed to fetch URL:", url.url);
      continue;
    }
    if (imageContentType.imageTypes.includes(res.headers.get("content-type"))) {
      imageCount = 1;
    } else {
      const html = await res.text();

      const root = parse(html);
      const images = root.querySelectorAll("img");
      if (images.length === 0) {
        imageCount = 0;
      }
      imageCount = images.length;
    }
    console.log(`Found ${imageCount} images for URL: ${url.url}`);
    try {
      const imageId = await queries.addImage(url.id, imageCount);
      console.log(`Image record created with ID: ${imageId} for URL: ${url.url}`);
    } catch (error) {
      console.error("Error adding image record:", error);
      continue;
    }
  }
  return Promise.resolve("Cron task completed successfully");
}

export default cronTask;
