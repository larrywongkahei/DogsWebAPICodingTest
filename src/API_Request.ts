import axios from "axios"

type ReturnDataType = {
    success: boolean;
    description: string;
    status?: number;
    data?: any;
}

type ResponseDataType = {
    success: boolean;
    description: string;
    data?: any;
}
const API_Request = {
    GET: async (url:string) :Promise<ReturnDataType> => {

        let dataToResponse: ReturnDataType = {
            success: false,
            description: "",
            status:400,
        }

        try{
            const response = await axios.get(url, {
                withCredentials: true
            })

            dataToResponse.status = response.status;

            const { success, description, data }:ResponseDataType = response.data;
            
            dataToResponse.success = success;
            dataToResponse.description = description;
            dataToResponse.data = data

            return dataToResponse;
        }catch(error:any){
            dataToResponse.status = error.response.status;
            dataToResponse.description = error.response.data.description;
            return dataToResponse;
        }
    },
    PATCH: async <T>(url:string, body:T) :Promise<ReturnDataType> => {

        let dataToResponse: ReturnDataType = {
            success: false,
            description: "",
            status:400,
        }

        try{
            const response = await axios.patch(url, body, {
                withCredentials: true
            })

            dataToResponse.status = response.status;

            const { success, description }:ResponseDataType = response.data;
            
            dataToResponse.success = success;
            dataToResponse.description = description;

            return dataToResponse;
        }catch(error:any){
            dataToResponse.status = error.response.status;
            dataToResponse.description = error.response.data.description;
            return dataToResponse;
        }
    },
    POST: async <T>(url:string, body:T) :Promise<ReturnDataType> => {

        let dataToResponse: ReturnDataType = {
            success: false,
            description: "",
            status:400,
        }

        try{
            const response = await axios.post(url, body, {
                withCredentials: true
            })

            dataToResponse.status = response.status;

            const { success, description }:ResponseDataType = response.data;
            
            dataToResponse.success = success;
            dataToResponse.description = description;

            return dataToResponse;
        }catch(error:any){
            dataToResponse.status = error.response.status;
            dataToResponse.description = error?.response.data?.description;
            return dataToResponse;
        }
    },
    DELETE: async (url:string) :Promise<ReturnDataType> => {

        let dataToResponse: ReturnDataType = {
            success: false,
            description: "",
            status:400,
        }

        try{
            const response = await axios.delete(url, {
                withCredentials: true
            })

            dataToResponse.status = response.status;

            const { success, description }:ResponseDataType = response.data;
            
            dataToResponse.success = success;
            dataToResponse.description = description;

            return dataToResponse;
        }catch(error:any){
            dataToResponse.status = error.response.status;
            dataToResponse.description = error.response.data.description;
            return dataToResponse;
        }
    },
}


export default API_Request;