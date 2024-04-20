"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAverageData = exports.GetMinData = exports.GetMaxData = void 0;
const grpClient_1 = __importDefault(require("../grpClient"));
const GetMaxData = async (req, res) => {
    try {
        const { from, until, property } = req.query;
        if (!from || !until || !property) {
            return res.status(400).json({ message: "Both 'from' and 'until' query parameters are required." });
        }
        const dataRequest = { from: from.toString(), until: until.toString(), property: property.toString() };
        grpClient_1.default.GetMaxData(dataRequest, (error, response) => {
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
exports.GetMaxData = GetMaxData;
const GetMinData = async (req, res) => {
    try {
        const { from, until, property } = req.query;
        if (!from || !until || !property) {
            return res.status(400).json({ message: "Both 'from' and 'until' query parameters are required." });
        }
        const dataRequest = { from: from.toString(), until: until.toString(), property: property.toString() };
        grpClient_1.default.GetMinData(dataRequest, (error, response) => {
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
exports.GetMinData = GetMinData;
const GetAverageData = async (req, res) => {
    try {
        console.log("Beggining of average");
        const { from, until, property } = req.query;
        if (!from || !until || !property) {
            return res.status(400).json({ message: "Both 'from' and 'until' query parameters are required." });
        }
        const dataRequest = { from: from.toString(), until: until.toString(), property: property.toString() };
        grpClient_1.default.GetAverageData(dataRequest, (error, response) => {
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
exports.GetAverageData = GetAverageData;
