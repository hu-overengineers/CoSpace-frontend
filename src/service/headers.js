/**
 * Credit: Umut Emre Bayramoğlu
 * https://github.com/CommunITU/communitu-frontend
 */

import {AuthService} from "./AuthService";

export const headersWithToken = (params) => {
    const token = AuthService.getJwtToken();
    return {
        headers: {
            "Authorization": `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        },
        params: params
    }
}

export const fileUploadWithToken = () => {
    const token = AuthService.getJwtToken();
    return {
        headers: {
            "Authorization": `Bearer ${token}`,
            'Accept': 'application/json',
            "Content-Type": "multipart/form-data",
        }
    }
}

export const baseHeaders = () => {
    return {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
}


export const baseHeadersNoCors = () => {
    return {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }
    }
}
