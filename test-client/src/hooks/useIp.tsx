// interface IP_API_Response {
//     status: string
//     message?: string
//     countryCode: string
//     zip: string
//     asname: string
//     mobile: boolean
//     proxy: boolean
//     query: string
// }
interface IP_API_Response {
    ip: string
}

export const useIp = async (): Promise<IP_API_Response> => {
    const URI: string = import.meta.env.VITE_IP_API_URI;
    const response = await fetch(URI);
    const result: IP_API_Response = await response.json();
    

    // if (result.status !== "success") {
    //     console.log(result.message);
    //     localStorage.setItem("_connection", "false");
    //     throw new Error("IP API Response not successful")
    // } 
    // else if (result.status === "success") {
    //     localStorage.setItem("_connection", "true");
    // }

    // const status = result.status;
    // const countryCode = result.countryCode;
    // const zip = result.zip;
    // const asname = result.asname;
    // const mobile = result.mobile;
    // const proxy = result.proxy;
    // const query = result.query;
    const ip = result.ip;

    // return {
    //     status,
    //     countryCode,
    //     zip,
    //     asname,
    //     mobile,
    //     proxy,
    //     query
    // }
    return {
        ip
    }
}

