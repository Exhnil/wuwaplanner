import { axiosInstance } from "./axios";


const normalizeId = (id: string) => {
    return id.toLowerCase().replace(/_/g, "-")
}

const normalizeWeaponId = (id: string) =>
    id.toLowerCase().replace(/&/g, "and").replace(/[_\s]/g, "-");

const normalizeCharacterId = (id: string) =>
    id.toLowerCase().replace(/[_\s]/g, "-");

export const getMaterialIcon = (id: string) => {
    const normId = normalizeId(id)

    return `${axiosInstance.defaults.baseURL}/materials/${normId}/images/${normId}`
}

export const getWeaponIcon = (id: string) => {
    const normalizedId = normalizeWeaponId(id);

    return `${axiosInstance.defaults.baseURL}/weapons/${normalizedId}/images/icon`;
}

export const getCharacterIcon = (id: string) => {
    const normalizedId = normalizeCharacterId(id);

    return `${axiosInstance.defaults.baseURL}/characters/${normalizedId}/images/icon`;
};