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
    accuracy:  number,
    disease: Array<{"name": string, "type": "초기" | "중기" | "말기"}>,
    information: {[key: string]: string}
}