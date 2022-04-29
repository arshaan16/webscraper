const PORT = process.env.PORT || 8000;
//const axios = require("axios");
import axios from "axios";
//const cheerio = require("cheerio");
import cheerio from "cheerio";
//const express = require("express");
import express from "express";
const app = express();
//const cors = require("cors");
import cors from "cors";
// const { response } = require("express");
app.use(cors());
// console.log(list);
app.use(express.json());
const url = "https://privatephotoviewer.com/usr/";

app.get("/", function (req, res) {
  res.json("This is my webscraper");
});
// app.post("/results", function (req, res) {
//   // console.log(req);
//   let data = req.body;
//   console.log(data);
//   return res.send(200);
// });
app.get("/results", function (req, res) {
  const instaId = req.query.insta;
  if (!instaId) {
    return res.send(400);
  }
  axios(url + instaId)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const articles = [];

      $(".followerCount", html).each(function () {
        console.log($(this).text());
        const title = $(this).text();
        articles.push(title);
      });
      res.json(articles);
      console.log(articles);
    })
    .catch((err) => {
      res.send(400);
      console.log(err);
    });
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
