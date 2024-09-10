/* eslint-disable */
import { MongoClient } from 'mongodb';

declare global {
  namespace globalThis {
    var _mongo: Promise<MongoClient>;
  }
}
