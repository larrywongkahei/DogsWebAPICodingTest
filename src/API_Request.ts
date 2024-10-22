import axios from "axios"

type ReturnDataType = {
    success: boolean;
    description: string;
}

type ResponseDataType = {
    success: boolean;
    description: string;
}
const API_Request = {
    GET: async (url:string) :Promise<ReturnDataType> => {

        let dataToResponse: ReturnDataType = {
            success: false,
            description: ""
        }

        try{
            const response = await axios.get(url, {
                withCredentials: true
            })

            const { success, description }:ResponseDataType = response.data;
            
            dataToResponse.success = success;
            dataToResponse.description = description;

            return dataToResponse;
        }catch(error:unknown){
            dataToResponse.description = "Something wrong when getting data, please try again later";
            return dataToResponse;
        }
    },
    PUT: async <T>(url:string, body:T) :Promise<ReturnDataType> => {

        let dataToResponse: ReturnDataType = {
            success: false,
            description: ""
        }

        try{
            const response = await axios.put(url, body, {
                withCredentials: true
            })

            const { success, description }:ResponseDataType = response.data;
            
            dataToResponse.success = success;
            dataToResponse.description = description;

            return dataToResponse;
        }catch(error:any){
            dataToResponse.description = "Something wrong when updating, please try again later";
            return dataToResponse;
        }
    },
    POST: async <T>(url:string, body:T) :Promise<ReturnDataType> => {

        let dataToResponse: ReturnDataType = {
            success: false,
            description: ""
        }

        try{
            const response = await axios.post(url, body, {
                withCredentials: true
            })

            const { success, description }:ResponseDataType = response.data;
            
            dataToResponse.success = success;
            dataToResponse.description = description;

            return dataToResponse;
        }catch(error:unknown){
            dataToResponse.description = "Something is wrong, please try again later";
            return dataToResponse;
        }
    },
    DELETE: async (url:string) :Promise<ReturnDataType> => {

        let dataToResponse: ReturnDataType = {
            success: false,
            description: ""
        }

        try{
            const response = await axios.get(url, {
                withCredentials: true
            })

            const { success, description }:ResponseDataType = response.data;
            
            dataToResponse.success = success;
            dataToResponse.description = description;

            return dataToResponse;
        }catch(error:unknown){
            dataToResponse.description = "Something is wrong when deleting, please try again later";
            return dataToResponse;
        }
    },
}


export default API_Request;