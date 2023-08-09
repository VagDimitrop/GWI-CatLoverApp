import axios from "axios";
import {APIKey, BaseUrl} from "../Constants";

export const fetchBreeds = async (payload) => {
    try {
        const response = await axios.get(BaseUrl + 'breeds',
            {headers: {'x-api-key': APIKey}});
        return response.data;
    } catch (error) {
        throw error;
    }
}
