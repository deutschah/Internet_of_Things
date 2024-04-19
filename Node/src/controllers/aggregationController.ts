import grpcClient from "../grpClient";
import { Request, Response } from 'express';
import { Operation } from 'express-openapi';


export const GetMaxData = async (req: Request, res: Response) => {
    try {
        const { from, until,property } = req.query;
        
  
        if (!from || !until || !property) {
            return res.status(400).json({ message: "Both 'from' and 'until' query parameters are required." });
        }
  
        const dataRequest = { from: from.toString(), until: until.toString(), property: property.toString() };
  
        grpcClient.GetMaxData(dataRequest, (error: any, response: any) => {
            if (error) {
                console.error('Error fetching AC data:', error);
                res.status(500).json({ message: 'Error fetching AC data', details: error.message });
            } else {
                console.log('Received AC data:', response); 
                res.json(response);
            }
        });
  
    } catch (error: any) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', details: error.message });
    }
  };
  
  
  export const GetMinData = async (req: Request, res: Response) => {
    try {
        const { from, until,property } = req.query;
        
  
        if (!from || !until || !property) {
            return res.status(400).json({ message: "Both 'from' and 'until' query parameters are required." });
        }
  
        const dataRequest = { from: from.toString(), until: until.toString(), property: property.toString() };
  
        grpcClient.GetMinData(dataRequest, (error: any, response: any) => {
            if (error) {
                console.error('Error fetching AC data:', error);
                res.status(500).json({ message: 'Error fetching AC data', details: error.message });
            } else {
                console.log('Received AC data:', response); 
                res.json(response);
            }
        });
  
    } catch (error: any) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', details: error.message });
    }
  };
  
  export const GetAverageData = async (req: Request, res: Response) => {
    try {
      console.log("Beggining of average")
        const { from, until,property } = req.query;
        
  
        if (!from || !until || !property) {
            return res.status(400).json({ message: "Both 'from' and 'until' query parameters are required." });
        }
  
        const dataRequest = { from: from.toString(), until: until.toString(), property: property.toString() };
  
        grpcClient.GetAverageData(dataRequest, (error: any, response: any) => {
            if (error) {
                console.error('Error fetching AC data:', error);
                res.status(500).json({ message: 'Error fetching AC data', details: error.message });
            } else {
                console.log('Received AC data:', response); 
                res.json(response);
            }
        });
  
    } catch (error: any) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', details: error.message });
    }
  };