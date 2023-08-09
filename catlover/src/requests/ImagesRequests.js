import axios from "axios";
import {APIKey, BaseUrl} from "../Constants";

export const fetchImages = async () => {
    try {
        const response = await axios.get(BaseUrl + 'images/search?limit=10',
            {headers: {'x-api-key': APIKey}});
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const fetchImagesById = async (id) => {
    try {
        const response = await axios.get(BaseUrl + 'images/search?limit=10',{
            params: {id: id}
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
