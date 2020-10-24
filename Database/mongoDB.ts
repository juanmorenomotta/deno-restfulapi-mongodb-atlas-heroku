import { 
  MongoClient 
} from "../deps.ts";

import { config } from '../Config/config.ts';

export class Database {
  public client: MongoClient;
  private url: string;
  private db: string;

  constructor(private mongoconn: string, private dbName: string) {
    this.url = mongoconn;
    this.db = dbName;
    this.client = new MongoClient();
  }

  connect() {
    this.client.connectWithUri(this.url);
  }

  getDatabase() {
    return this.client.database(this.dbName);
  }

  getCollection<T extends any>(collection: string ) {
    const database = this.getDatabase();
    return database.collection<T>(collection);
  }
}

const dbHostUrl = config.uri || "mongodb://localhost:27017";
const dbName = config.database || "deno_db";

const db = new Database(dbHostUrl, dbName);
db.connect();

export default db;
