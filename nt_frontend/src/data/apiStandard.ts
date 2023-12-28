function getApiUrl(path: string) {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";
    return `${backendUrl}${path}`;
}

export const backendUrl = {
    plantAnalyzation: getApiUrl('/api/analyze_plant')
};

export interface PlanetAnalyzationRequest {
    base64Image: string;
}
export interface PlanetAnalyzationResponse {
    name: string,
    accuracy: number,
    disease: Array<{"name": string, "type": "light" | "warning" | "danger"}>,
    information: {[key: string]: string}
}