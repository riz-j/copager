import { useState, useEffect } from "react";
import { useIp } from "./useIp";

interface UseLanRoom {
  lanRoomAddr: string | null;
  mobile: boolean;
  proxy: boolean;
}

export const useLanRoom = (): UseLanRoom => {
  const [lanRoomAddr, setLanRoomAddr] = useState<string | null>(null);
  const [mobile, setMobile] = useState<boolean | null>(null);
  const [proxy, setProxy] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await useIp();
      const { query, asname, countryCode, zip, mobile, proxy } = result;

      setMobile(mobile);
      setProxy(proxy);

      if (query && asname && countryCode && zip && (!mobile && !proxy)) {
        const networkPrefix = networkExtractor(query);
        setLanRoomAddr(`${networkPrefix}_${asname}_${countryCode}_${zip}`);
      } else {
        setLanRoomAddr(null);
      }
    };

    fetchApi();
  }, []);

  if (mobile !== null && proxy !== null && lanRoomAddr) {
    return {
        lanRoomAddr,
        mobile,
        proxy,
      };
  } else {
    throw new Error("API promise not fulfilled")
  }
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