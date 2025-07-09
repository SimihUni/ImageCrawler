import { genericQuery } from "./connection";
import { isValidHttpUrl } from "../helpers";

async function getURLs(pageSize = 100, firstId = 0) {
  if (!pageSize || pageSize <= 0) {
    throw new Error("Invalid page size");
  }
  if (!firstId || firstId < 0) {
    throw new Error("Invalid first ID");
  }
  const query =
    "SELECT id, url FROM urls WHERE active = true AND blackList = false AND id > $2 ORDER BY id DESC LIMIT $1";
  const values = [pageSize, firstId];
  const result = await genericQuery(query, values);
  return result.map((row) => ({
    id: row.id,
    url: row.url,
  }));
}

async function addURL(url) {
  if (!url || typeof url !== "string" || !isValidHttpUrl(url)) {
    throw new Error("Invalid URL");
  }
  const query = "INSERT INTO urls (url) VALUES ($1) RETURNING id";
  const values = [url];
  const result = await genericQuery(query, values);
  if (result.length === 0) {
    throw new Error("Failed to insert URL");
  }
  return result[0].id;
}

async function updateActiveStatusURL(url_id, active = true) {
  if (!url_id || url_id <= 0) {
    throw new Error("Invalid URL ID");
  }
  if (typeof active !== "boolean") {
    throw new Error("Invalid active status");
  }
  const query = "UPDATE urls SET active = $2 WHERE id = $1";
  const values = [url_id, active];
  const result = await genericQuery(query, values);
  return result.rowCount > 0;
}

async function updateBlacklistedURL(id, blacklisted = true) {
  if (!id || id <= 0) {
    throw new Error("Invalid ID");
  }
  if (typeof blacklisted !== "boolean") {
    throw new Error("Invalid blacklisted status");
  }
  const query =
    "UPDATE urls SET blackList = $2, blackDate = NOW() WHERE id = $1";
  const values = [id, blacklisted];
  const result = await genericQuery(query, values);
  return result.rowCount > 0;
}

async function addImage(urlId, imageCount) {
  if (!urlId || urlId <= 0) {
    throw new Error("Invalid URL ID");
  }
  if (typeof imageCount !== "number" || imageCount < 0) {
    throw new Error("Invalid image count");
  }
  const query =
    "INSERT INTO images (url_id, imageCount) VALUES ($1, $2) RETURNING id";
  const values = [urlId, imageCount];
  const result = await genericQuery(query, values);
  if (result.length === 0) {
    throw new Error("Failed to insert image");
  }
  return result[0].id;
}

async function aggregateAverageImageCount(urlId, periodInDays = null) {
  if (!urlId || urlId <= 0) {
    throw new Error("Invalid URL ID");
  }
  let query = "SELECT AVG(imageCount) AS average FROM images WHERE url_id = $1";
  const values = [urlId];

  if (periodInDays && typeof periodInDays === "number" && periodInDays > 0) {
    query += " AND created_at >= NOW() - INTERVAL '$2 days'";
    values.push(periodInDays);
  }

  const result = await genericQuery(query, values);
  if (result.length === 0 || result[0].average === null) {
    return 0;
  }
  return parseFloat(result[0].average);
}

async function getSortedAveragesForURLsForTimePeriod(periodInDays = null) {
  let query = "SELECT url_id, AVG(imageCount) AS average FROM images";
  const values = [];

  if (periodInDays && typeof periodInDays === "number" && periodInDays > 0) {
    query += " WHERE created_at >= NOW() - INTERVAL '$1 days'";
    values.push(periodInDays);
  }

  query += " GROUP BY url_id ORDER BY average DESC";

  const result = await genericQuery(query, values);
  return result.map((row) => ({
    urlId: row.url_id,
    average: parseFloat(row.average),
  }));
}

export default {
  getURLs,
  addURL,
  updateActiveStatusURL,
  updateBlacklistedURL,
  addImage,
  aggregateAverageImageCount,
  getSortedAveragesForURLsForTimePeriod,
};