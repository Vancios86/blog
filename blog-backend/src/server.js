import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, "/build")));
app.use(bodyParser.json());

const withDB = async (operations, res) => {
  try {
    //connect to the database
    const client = await MongoClient.connect("mongodb://localhost:27017");
    const db = client.db("my-blog");

    await operations(db);

    client.close();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error connecting to the database", error });
  }
};

//get articles endpoint
app.get("/api/articles/:name", async (req, res) => {
  withDB(async (db) => {
    const articleName = req.params.name;
    //identify the article
    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });

    res.status(200).json(articleInfo);
  }, res);
});

//upvote endoint
app.post("/api/articles/:name/upvote", async (req, res) => {
  withDB(async (db) => {
    const articleName = req.params.name;

    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    //update the upvotes
    await db.collection("articles").updateOne(
      { name: articleName },
      {
        $set: { upvotes: articleInfo.upvotes + 1 },
      }
    );
    //update the upvotes value
    const updatedArticleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    //send the response back to the client
    res.status(200).json(updatedArticleInfo);
  }, res);
});

//add comments endpoint
app.post("/api/articles/:name/add-comment", (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;

  withDB(async (db) => {
    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    await db.collection("articles").updateOne(
      { name: articleName },
      {
        $set: {
          comments: articleInfo.comments.concat({ username, text }),
        },
      }
    );
    const updatedArticleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });

    res.status(200).json(updatedArticleInfo);
  }, res);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.listen(8000, () => console.log("server running on port 8000"));
