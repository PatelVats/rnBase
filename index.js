import mongoose from "mongoose";
import express from "express";
import { Employees } from "./models/Todo.js";
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



let con = await mongoose.connect("mongodb://localhost:27017/company");
const app = express();
const PORT = 3000;



const generateRandomEmployee = () => {
    let employeeName = ["Naman", "Riya", "Ashita", "Akshat", "Ayush"];
    let employeeSalary = [20000, 50000, 70000, 30000, 80000];
    let employeeLanguage = ["Hindi", "English", "Gujarati", "French", "Japanese"];
    let employeeCity = ["Ahmedabad", "Surat", "Gandhinagar", "Mumbai", "Ayodhya"];
    let isManager = [true, false];

    let emname = employeeName[Math.floor(Math.random() * employeeName.length)];
    let emsalary = employeeSalary[Math.floor(Math.random() * employeeSalary.length)];
    let emlanguage = employeeLanguage[Math.floor(Math.random() * employeeLanguage.length)];
    let emcity = employeeCity[Math.floor(Math.random() * employeeCity.length)];
    let emmanager = isManager[Math.floor(Math.random() * isManager.length)];

    return {
        Name: emname,
        Salary: emsalary,
        Language: emlanguage,
        City: emcity,
        IsManager: emmanager
    };
};



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post('/generate-record', async (req, res) => {
    const newEmployee = generateRandomEmployee();
    const data = new Employees(newEmployee);
        await data.save();
        res.json({ message: 'Record generated', record: data });
});


app.listen(PORT, () => {
    console.log(`Example port listening on ${PORT}`);   
})