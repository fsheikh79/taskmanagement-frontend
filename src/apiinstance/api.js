import axios from "axios";
const API_URL = "http://localhost:5000/";
export const apiInstance = async ({url, body, method,headers})=>{
    try {
        
        const callApi = await axios({
            method: method,
            url: API_URL + url,
            data: body,
            headers: headers,
        })
        return callApi.data;
    } catch (error) {
        // console.log("error in apiInstance: ", error);
    }

}