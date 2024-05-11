import axios from "axios";

const ApiRequest = async (METHOD, ENDPOINT, DATA, TOKEN) => {
    const config = {
        method: METHOD,
        url: ENDPOINT,
        data: DATA,
        headers: {
            "Content-Type": "application/json",
        },
        timeout: 5000,
        params: {},
    }

    if (TOKEN != null)
        axios.defaults.headers['Authorization'] = `Bearer ${TOKEN}`
    try {
        console.log(config)
        const response = await axios.request(config);
        return responseHandler(response);
    } catch (err) {
        console.error(err);
        return errorHandler(err)
    }
}

const responseHandler = (response) => {
    const result = {
        data: response?.data,
        status: response?.status,
    }
    return result;
}

const errorHandler = (error) => {
    console.log(error)
    const result = {
        message: error?.response?.data?.message || "Something went wrong",
        status: error?.response?.data?.status,
    }
    return result;
}

export { ApiRequest };