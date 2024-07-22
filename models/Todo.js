import mongoose, { mongo } from "mongoose";


const EmployeeSchema = new mongoose.Schema({
    Name: String,
    Salary: Number,
    Language: String,
    City: String,
    IsManager: Boolean
});

export const Employees = mongoose.model("Employees", EmployeeSchema);

