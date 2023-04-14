import { getToken } from "./token";

const token = getToken();
export const config = {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}