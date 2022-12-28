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

app.route("/onDelete")
  .delete(onDelete);

server.listen(port, () => {
  console.log("Listening on port " + port)
}); 


async function getDatabase(req, res) {
  const collection = await getCollection();
  const documents = await collection.find().toArray();

  res.send(documents);
}

async function putDatabase(req, res){

  const _id = {_id : new ObjectId()}
  const song = { $set: req.body}

  const collection = await getCollection();
  await collection.updateOne(_id, song, {upsert: true});
  const documents = await collection.find().toArray();
  
  res.send(await(documents));
}

async function onDelete(req, res){
  const collection = await getCollection();
  const documents = await collection.find().toArray();

  await collection.deleteOne({_id: req.body._id})
  res.send(await(documents));
}