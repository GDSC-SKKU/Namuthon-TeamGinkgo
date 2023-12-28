import { useLocalStorage } from "usehooks-ts";
import { PlanetAnalyzationResponse } from "./apiStandard";

export const useUserDataStorage = {
    test: () => useLocalStorage<string[]>('test', []),
    plantAnalyzationHistory: () => useLocalStorage<Array<{timestamp: Date, base64Image: string, data: PlanetAnalyzationResponse}>>('plantAnalyzationHistory', []),
};