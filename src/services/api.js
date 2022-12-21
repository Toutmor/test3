const BASE_URL = "https://api.cleandata.link"



export const api = async (url, method, body = null, headers = {}) => {
    try {
        const endPoint = BASE_URL.concat(url)
        const reqBody = body ? JSON.stringify(body) : null

        const fetchParams = {method, headers}

    if((method === "POST" || method === "PUT") && !reqBody){
        throw new Error("Request body required")
    }

    if(reqBody){
        fetchParams.headers["Content-type"] = "application/json"
        fetchParams.body = reqBody
    }

    const fetchPromise = fetch(endPoint, fetchParams)
    const timeOutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("Request Timeout")
        }, 10000)
    })

    const response = await Promise.race([fetchPromise, timeOutPromise])

    return response
 
    } catch (e) {
        return e
    }
}

export const fetchApi = async (url, method, body, statusCode, token, loader = false, promiseReturnType = "json")  => {
    try {
        
        const headers = {}
        const result = {
            token: null,
            success: false,
            responseBody: null
        }
        if(token) {
            //headers: { Authorization: `Bearer ${token}` }
            //headers["Bearer"] = token
            headers["Authorization"] = `Bearer ${token}`
        }
        const response = await api(url, method, body, headers)
      
        
        if(response.status === statusCode) {
            result.success = true
           
            if(response.headers.get("Authorization")){
               result.token = response.headers.get("Authorization")
            }
            let responseBody;
            const responseText = await response.text()
           
            try {
                responseBody = JSON.parse(responseText);
            } catch (e) {
                responseBody = e;
            }

            result.responseBody = responseBody
    
            return result 
        } 
        

        let errorBody;
        const errorText = await response.text();
       
        try {
            errorBody = JSON.parse(errorText);
        } catch (e) {
            errorBody = e;
        }
        
        result.responseBody = errorBody
       
        throw result
    } catch (error) {
        let errorBody = "Pas de connexion à internet";
        return errorBody
        
    }
} 