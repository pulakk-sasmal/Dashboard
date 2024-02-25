import {readFile} from 'fs/promises';
import connection from '../db/connection.js';
import Dashboard from '../db/model.js';

connection();

const jsonData = await readFile('./db.json', 'utf-8');
const data = JSON.parse(jsonData);

const start = async () => {
    try{
        const response = await Dashboard.create(data);
        if(response){
            console.log("Success");
        }
    }catch(error){
        console.log(error);
    }
}

start();