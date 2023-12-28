export interface testRequest {
    user: string;
}

export interface testResponse {
    isUserAvailable: boolean;
}

export interface planetAnalyzationRequest {
    base64Image: string;
}

export interface platnetAnalyzationResponse {
    planet: string;
    confidence: number;
}