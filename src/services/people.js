import {api} from '../config/api'
import * as SecureStore from 'expo-secure-store';

const KEY_STORAGE = "settafavorites"
const setStorage = async (data) =>  SecureStore.setItemAsync(KEY_STORAGE, JSON.stringify(data));
const getStorage = async () =>  SecureStore.getItemAsync(KEY_STORAGE);

async function getAll(page = 1) {
    const URI = `/people${page !== 1 ? `/?page=${page}` : ''}`
    try {
        const { data } = await api.get(URI)
        return data
    } catch (error) {
        console.error(`ERRO AO CHAMAR ${URI}`)
    }
}

async function getById(id) {
    try {
        const { data } = await api.get(`/people/${id}`)
        return data
    } catch (error) {
        console.error(`ERRO AO CHAMAR /people/${id}`)
    }
}

const setFavoriteStorage = async (id) => {
    let data = JSON.parse(await getStorage())
    
    if (data === null) {
        data = []
    }

    data.push(parseInt(id))
    data = [...new Set(data)]
    setStorage(data)
}

const getFavoritesStorage = async () => {
    const data = JSON.parse(await getStorage())
    return [...new Set(data)]
}

const removeFavoritesStorageById = async (id) => {
    const data = await JSON.parse(await getStorage())
    const newData = data.filter(item => item != id)
    await setStorage(newData)
}

export {
    getAll,
    getById,
    setFavoriteStorage,
    getFavoritesStorage,
    removeFavoritesStorageById,
}