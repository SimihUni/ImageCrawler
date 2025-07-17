import express from "express";
import { isValidHttpUrl } from "../helpers.js";
import queries from "../db/queries.js";
import cronTask from "../cronjob.js";
const crud = express.Router();

crud.get("/", (req, res) => {
  res.json({
    message: "Crud endpoint is working",
    status: "success",
  });
});

crud.get("/get-urls", async (req, res) => {
  try {
    const result = await queries.getURLs();
    if (!result || result.length === 0) {
      return res.status(404).json({
        message: "No URLs found",
        status: "error",
      });
    }
    res.json({
      urls: result,
      status: "success",
    });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).json({
      message: "Internal server error",
      status: "error",
    });
  }
});

crud.get("/task", async (req, res) => {
  try {
    await cronTask();
    res.json({
      message: "Cron task executed successfully",
      status: "success",
    });
  } catch (error) {
    console.error("Error executing cron task:", error);
    res.status(500).json({
      message: "Internal server error",
      status: "error",
    });
  }
});

crud.post("/add-url", async (req, res) => {
  const { url } = req.body;
  console.log(isValidHttpUrl(url));
  if (!url || !isValidHttpUrl(url)) {
    return res.status(400).json({
      message: "Invalid URL provided",
      status: "error",
    });
  }

  const result = await queries.addURL(url);

  res.json({
    message: `URL ${url} added successfully with ID ${result}`,
    status: "success",
  });
});

export default crud;
