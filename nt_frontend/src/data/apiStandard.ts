export interface PlanetAnalyzationRequest {
    base64Image: string;
}

export interface PlanetAnalyzationResponse {
    name: string,
    disease: Array<{"name": string, "type": "light" | "warning" | "danger"}>,
    information: {[key: string]: string}
}