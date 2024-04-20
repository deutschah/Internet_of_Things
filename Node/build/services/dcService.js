"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grpClient_1 = __importDefault(require("../grpClient"));
const fetchAllDCData = async () => {
    return new Promise((resolve, reject) => {
        grpClient_1.default.getAllDCData({}, (error, data) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(data);
            }
        });
    });
};
exports.default = {
    fetchAllDCData
};
