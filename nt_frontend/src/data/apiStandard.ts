import { defaultBackendUrl } from "./config";

function getApiUrl(path: string) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || defaultBackendUrl;
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