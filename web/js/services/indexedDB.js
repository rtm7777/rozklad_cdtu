import Dexie from "dexie";
import model from "../indexedDB/model";

let db = new Dexie("rozklad");

db.version(1).stores(model);

export default db;
