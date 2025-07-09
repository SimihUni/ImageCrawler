import express from "express";
import { isValidHttpUrl } from "../helpers";
import queries from "../db/queries";
const crud = express.Router();

crud.get("/", (req, res) => {
  res.json({
    message: "Crud endpoint is working",
    status: "success",
  });
});

crud.post("/add-url", async (req, res) => {
  const { url } = req.body;
  if (!url || !isValidHttpUrl(url)) {
    return res.status(400).json({
      message: "Invalid URL provided",
      status: "error",
    });
  }

  const res = await queries.addURL(url);

  res.json({
    message: `URL ${url} added successfully with ID ${res}`,
    status: "success",
  });
});

export default crud;
