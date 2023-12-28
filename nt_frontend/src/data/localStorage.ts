import { useLocalStorage } from "usehooks-ts";

export const useUserDataStorage = {
    test: () => useLocalStorage<string[]>('test', [])
};