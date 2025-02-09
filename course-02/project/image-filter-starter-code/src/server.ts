import express, { response } from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import { IndexRouter } from './indexrouter';
import { filterImageFromURL, deleteLocalFiles } from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8080;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.use("/api/v0/", IndexRouter)

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    res.send("/api/v0/");
    //    res.send("try GET /filteredimage?image_url={{}}")
  });

  app.get("/vwacdest", async (req, res) => {
    console.log(req.body);
    console.log(req.ip);
    res.status(200).send({ requestBody: req.body, message: "test", sourceip: req.ip })
  });


  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();