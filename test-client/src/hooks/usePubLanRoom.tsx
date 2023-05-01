import { useState, useEffect } from "react";
import { useIp } from "./useIp";

interface usePubLanRoom {
  pubLanRoom: string | null;
  mobile: boolean;
  proxy: boolean;
}

export const usePubLanRoom = (): usePubLanRoom => {
  const [pubLanRoom, setPubLanRoom] = useState<string | null>(null);
  const [mobile, setMobile] = useState<boolean>(false);
  const [proxy, setProxy] = useState<boolean>(false);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await useIp();
      const { query, asname, countryCode, zip, mobile, proxy } = result;

      setMobile(mobile);
      setProxy(proxy);

      if (query && asname && countryCode && zip && (!mobile && !proxy)) {

        const networkPrefix = networkExtractor(query);
        const __pubLanRoom = `PUBLIC_LAN__${networkPrefix}_${asname}_${countryCode}-${zip}`
        setPubLanRoom(__pubLanRoom);

        localStorage.setItem("pubLanRoom", __pubLanRoom);

        localStorage.setItem("_mobile", "false");
        localStorage.setItem("_proxy", "false");

      } else {
        
        if (mobile) {
            localStorage.setItem("_mobile", "true");
            localStorage.setItem("pubLanRoom", "");
            console.log("WARNING: Client is connected to cellular");
            alert("WARNING: Client is connected to cellular");
        }
        if (proxy) {
            localStorage.setItem("_proxy", "true");
            localStorage.setItem("pubLanRoom", "");
            console.log("WARNING: Client is connected to a Proxy");
            alert("WARNING: Client is connected to a Proxy");
        } 
        else {
            localStorage.setItem("pubLanRoom", "");
        }

        setPubLanRoom(null);
      }
    };

    fetchApi();
  }, []);

    return {
        pubLanRoom,
        mobile,
        proxy,
      };
};


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