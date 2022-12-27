import express, {json} from "express";
import {createServer } from "http";
import cors from "cors";
import { ObjectId, MongoClient, MongoError, Collection } from 'mongodb'
import { url } from './ConfigStuff.js'

const app = express();
const server = createServer(app);
const port = 6942;

const getCollection = () => MongoClient.connect(url).then(client => client.db("Scoreboard").collection('Songs'))

app.use(json());
app.use(cors());

app.route("/getDatabase")
  .get(getDatabase);

app.route("/putDatabase")
  .put(putDatabase);

server.listen(port, () => {
  console.log("Listening on port " + port)
}); 


async function getDatabase(req, res) {
  const collection = await getCollection();
  const documents = await collection.find().toArray();

  res.send(documents);
}

async function putDatabase(req, res){

  const{_id, ...songInfo} = {
    _id : new ObjectId, 
    title: "yes"
  }

  const collection = await getCollection();
  await collection.updateOne(_id, songInfo, true);
  const documents = await collection.find().toArray();
  
  res.send(documents);
}