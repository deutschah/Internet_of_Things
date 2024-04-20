"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteData = exports.UpdateData = exports.PostData = exports.GetData = void 0;
const grpClient_1 = __importDefault(require("../grpClient"));
const GetData = async (req, res) => {
    try {
        const { from, until } = req.query;
        if (!from || !until) {
            return res.status(400).json({ message: "Both 'from' and 'until' query parameters are required." });
        }
        const dataRequest = { from: from.toString(), until: until.toString() };
        grpClient_1.default.GetData(dataRequest, (error, response) => {
            if (error) {
                console.error('Error fetching AC data:', error);
                res.status(500).json({ message: 'Error fetching AC data', details: error.message });
            }
            else {
                console.log('Received AC data:', response);
                res.json(response);
            }
        });
    }
    catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', details: error.message });
    }
};
exports.GetData = GetData;
const PostData = async (req, res) => {
    try {
        const { dateTime, acPower, dcPower, totalYield } = req.body;
        const dataRequest = { dateTime, acPower, dcPower, totalYield };
        grpClient_1.default.PostData(dataRequest, (error, response) => {
            if (error) {
                console.error('Error adding data:', error);
                res.status(500).json({ message: 'Error adding data', details: error.message });
            }
            else {
                console.log('Data added successfully:', response);
                res.json(response);
            }
        });
    }
    catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', details: error.message });
    }
};
exports.PostData = PostData;
const UpdateData = async (req, res) => {
    try {
        const dateTime = req.query.dateTime;
        const { acPower, dcPower, totalYield } = req.body;
        if (!dateTime || !acPower || !dcPower || !totalYield) {
            return res.status(400).json({ message: "All fields must be provided" });
        }
        const updateRequest = {
            dateTime: dateTime,
            data: { dateTime, acPower, dcPower, totalYield }
        };
        grpClient_1.default.UpdateData(updateRequest, (error, response) => {
            if (error) {
                console.error('Error updating data:', error);
                res.status(500).json({ message: 'Error updating data', details: error.message });
            }
            else {
                console.log('Data updated successfully:', response);
                res.json(response);
            }
        });
    }
    catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', details: error.message });
    }
};
exports.UpdateData = UpdateData;
const DeleteData = async (req, res) => {
    try {
        const { dateTime } = req.params;
        const dataRequest = { dateTime };
        grpClient_1.default.DeleteData(dataRequest, (error, response) => {
            if (error) {
                console.error('Error deleting data:', error);
                res.status(500).json({ message: 'Error deleting data', details: error.message });
            }
            else {
                console.log('Data deleted successfully:', response);
                res.json(response);
            }
        });
    }
    catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', details: error.message });
    }
};
exports.DeleteData = DeleteData;
