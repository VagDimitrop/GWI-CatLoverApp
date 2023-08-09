import axios from "axios";
import {APIKey, BaseUrl, sub_id} from "../Constants";

// API request to fetch favorites of user.
// Used when navigating to FavoritesPage.
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

// API request to delete a single favorite entry of user.
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

// API request to delete a single favorite entry of user.
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
