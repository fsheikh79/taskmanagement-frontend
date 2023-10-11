import { apiInstance } from "./api";
export const getmethod = async ({ url,headers }) => {
  try {
    
    const responseFromApi = await apiInstance({
      url,
      method: "GET",
      headers
    });
    return responseFromApi;
  } catch (error) {
    console.log("error in reponseFromAPI: ", error);
  }
};

export const postmethod = async ({ url, body,headers }) => {
    try {
      
      const responseFromApi = await apiInstance({
        url,
        body,
        headers,
        method: "POST",
      });
      return responseFromApi;
    } catch (error) {
      console.log("error in reponseFromAPI: ", error);
    }
  };
  
export const putmethod = async ({ url, body,headers }) => {
    try {
      
      const responseFromApi = await apiInstance({
        url,
        body,
        headers,
        method: "PUT",
      });
      return responseFromApi;
    } catch (error) {
      console.log("error in reponseFromAPI: ", error);
    }
  };
export const deleteMethod = async ({ url,headers }) => {
    try {
      
      const responseFromApi = await apiInstance({
        url,
        // body,
        headers,
        method: "DELETE",
      });
      return responseFromApi;
    } catch (error) {
      console.log("error in reponseFromAPI: ", error);
    }
  };
  