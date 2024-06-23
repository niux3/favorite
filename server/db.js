import { JsonDB, Config } from 'node-json-db'
import configuration from './configuration.js'


let config = new Config(
    configuration.db.name, 
    configuration.db.saveOnPush, 
    configuration.db.humanReadable, 
    configuration.db.separator
)
const db = new JsonDB(config)
export default db
