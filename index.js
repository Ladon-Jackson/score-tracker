import express, {json} from "express";
import {createServer } from "http";
import cors from "cors";
import { ObjectId, MongoClient, MongoError, Collection } from 'mongodb'
import { url } from './ConfigStuff.js'

const app = express();
const server = createServer(app);
const port = 6942;

const getCollection = () => MongoClient.connect(url).then(client => client.db("testdb").collection('testCollection'))

app.use(json());
app.use(cors());

app.route("/this-works").get()

server.listen(port, () => {
  console.log("Listening on port " + port)
}); 

function name() {

}