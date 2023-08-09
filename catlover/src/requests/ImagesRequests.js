import axios from "axios";
import {APIKey, BaseUrl} from "../Constants";

// API request to fetch 10 random images.
// Used when navigating to HomePage, when clicking on Load More button in HomePage.
export const fetchImages = async () => {
    try {
        const response = await axios.get(BaseUrl + 'images/search?limit=10',
            {headers: {'x-api-key': APIKey}});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// API request to fetch 10 images of the same breed.
// Used when navigating to BreedsPage and clicks on a specific breed tile.
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
