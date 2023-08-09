import axios from "axios";
import {APIKey, BaseUrl, sub_id} from "../Constants";

export const fetchFavorites = async () => {
    try {
        const response = await axios.get(BaseUrl + 'favourites', {
            params: {sub_id: sub_id},
            headers: {'x-api-key': APIKey}
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteFavorite = async (id) => {
    try {
        const response = await axios.delete(BaseUrl + 'favourites/' + id, {
            headers: {'x-api-key': APIKey}
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addFavorite = async (payload) => {
    try {
        const response =  await axios.post(BaseUrl + 'favourites',
            payload,
            {headers: {'x-api-key': APIKey}
            });
        return response.data;
    } catch (error) {
        throw error;
    }
}
