import { useState } from "react";
import { useIp } from "./useIp";

interface UseLanRoom {
    lanRoomAddr: string
    mobile: boolean
    proxy: boolean
}

export const useLanRoom = (): UseLanRoom => {
    const [lanRoomAddr, setLanRoomAddr] = useState<string | null>(null);

    const [ip, setIp] = useState<string | null>(null);
    const [asname, setAsname] = useState<string | null>(null);
    const [countryCode, setCountryCode] = useState<string | null>(null);
    const [zip, setZip] = useState<string | null>(null);

    const [mobile, setMobile] = useState<boolean | null>(null);
    const [proxy, setProxy] = useState<boolean | null>(null);

    useIp().then(result => {
        setIp(result.query);
        setAsname(result.asname);
        setCountryCode(result.countryCode);
        setZip(result.zip);

        setMobile(result.mobile);
        setProxy(result.proxy);
    })

    if (ip && asname && countryCode && zip && (!mobile && !proxy)) {
        const networkPrefix = networkExtractor(ip);
        setLanRoomAddr(`${networkPrefix}_${asname}_${countryCode}_${zip}`);
    } 
    else {
        setLanRoomAddr(null);
    } 

    return {
        lanRoomAddr,
        mobile,
        proxy
    }
}


const networkExtractor = (ipAddress: string): string => {
    if (ipAddress.includes(".")) {
        // IPV4 
        const octetsStr: string[] = ipAddress.split(".");
        const octets: number[] = octetsStr.map(octet => parseInt(octet));

        if (octets[0] < 128) {
            // Class A 
            return `${octets[0]}`;
        } 
        else if (octets[0] < 192) {
            // Class B
            return `${octets[0]}.${octets[1]}`;
        }
        else {
            // Class C, D, or E
            return `${octets[0]}.${octets[1]}.${octets[2]}`;
        }
    }

    else if (ipAddress.includes(":")) {
        // IPV6
        const groupsStr: string[] = ipAddress.split(":");
        const groups: number[] = groupsStr.map(group => parseInt(group));

        return `${groups[0]}:${groups[1]}:${groups[2]}:${groups[3]}`
    }

    else {
        throw new Error("Invalid IP Address")
    }
}