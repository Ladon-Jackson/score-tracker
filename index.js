// import express, {json, Application} from "express";
import express from "express";
import { Server, createServer } from "http";
import cors from "cors";

const app = express();
const server = createServer(app);
const port = 6942;

//app.use(json());
app.use(cors());

server.listen(port, () => {
  console.log("Listening on port " + port)
}); 