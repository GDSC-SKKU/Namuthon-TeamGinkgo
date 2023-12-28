export interface testRequest {
    user: string;
}

export interface testResponse {
    isUserAvailable: boolean;
}

export interface planetAnalyzationRequest {
    base64Image: string;
}

export interface planetAnalyzationResponse {
    name: string,
    disease: Array<{"name": string, "type": "light" | "warning" | "danger"}>,
    information: {[key: string]: string}
}