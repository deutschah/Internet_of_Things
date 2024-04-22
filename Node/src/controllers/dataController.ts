import { Request, Response } from 'express';
import { Operation } from 'express-openapi';
import grpcClient from '../grpClient';

export const GetData = async (req: Request, res: Response) => {
  try {
      const { from, until } = req.query;

      if (!from || !until) {
          return res.status(400).json({ message: "Both 'from' and 'until' query parameters are required." });
      }

      const dataRequest = { from: from.toString(), until: until.toString() };

      grpcClient.GetData(dataRequest, (error: any, response: any) => {
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

export const PostData = async (req: Request, res: Response) => {
    try {
        const { dateTime, acPower, dcPower, totalYield } = req.body;
  
        const isValid = validateData({ dateTime, acPower, dcPower, totalYield });
        if (!isValid) {
          return res.status(400).json({ message: 'Invalid input data' });
        }

        const dataRequest = { dateTime, acPower, dcPower, totalYield };
  
        grpcClient.PostData(dataRequest, (error: any, response: any) => {
            if (error) {
                res.status(500).json({ message: 'Error adding data', details: error.message });
            } else {
                res.json(response);
            }
        });
  
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', details: error.message });
    }
  };

  
  export const UpdateData = async (req: Request, res: Response) => {
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
  
        grpcClient.UpdateData(updateRequest, (error: any, response: any) => {
            if (error) {
                console.error('Error updating data:', error);
                res.status(500).json({ message: 'Error updating data', details: error.message });
            } else {
                console.log('Data updated successfully:', response); 
                res.json(response);
            }
        });
  
    } catch (error: any) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', details: error.message });
    }
  };
  
  export const DeleteData = async (req: Request, res: Response) => {
    try {
        const { dateTime } = req.params;
  
        const dataRequest = { dateTime };
  
        grpcClient.DeleteData(dataRequest, (error: any, response: any) => {
            if (error) {
                console.error('Error deleting data:', error);
                res.status(500).json({ message: 'Error deleting data', details: error.message });
            } else {
                console.log('Data deleted successfully:', response); 
                res.json(response);
            }
        });
  
    } catch (error: any) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', details: error.message });
    }
  };

function mapGrpcErrorToHttpStatus(error: any) {
    throw new Error('Function not implemented.');
}

function validateData(arg0: { dateTime: any; acPower: any; dcPower: any; totalYield: any; }) {
    return true;
    throw new Error('Function not implemented.');
}

