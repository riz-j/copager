interface IP_API_Response {
    status: string
    message?: string
    countryCode: string
    zip: string
    asname: string
    mobile: boolean
    proxy: boolean
    query: string
}

export const useIp = async () => {
    const URI: string = import.meta.env.VITE_IP_API_URI;
    const response = await fetch(URI);
    const result: IP_API_Response = await response.json();
    
    if (result.status !== "success") {
        console.log(result.message);
        throw new Error("IP API Response not successful")
    }
    
    const countryCode = result.countryCode;
    const zip = result.zip;
    const asname = result.asname;
    const mobile = result.mobile;
    const proxy = result.proxy;
    const query = result.query;

    return {
        countryCode,
        zip,
        asname,
        mobile,
        proxy,
        query
    }
}

