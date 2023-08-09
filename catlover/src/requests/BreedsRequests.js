import axios from "axios";
import {APIKey, BaseUrl} from "../Constants";

// API request to fetch all cat breeds.
// Used when navigating to BreedsPage.
export const fetchBreeds = async (payload) => {
    try {
        const response = await axios.get(BaseUrl + 'breeds',
            {headers: {'x-api-key': APIKey}});
        return response.data;
    } catch (error) {
        throw error;
    }
}
