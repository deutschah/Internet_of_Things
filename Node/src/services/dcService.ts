import grpcClient from '../grpClient';

const fetchAllDCData = async () => {
    return new Promise((resolve, reject) => {
        grpcClient.getAllDCData({}, (error:any, data:any) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
};

export default {
    fetchAllDCData
};
