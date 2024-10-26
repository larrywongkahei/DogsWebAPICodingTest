import axios from "axios";

export default function useFetchImage(){

    async function fetchRandomImage(main:string, sub:string=""):Promise<string>{
        const fURL = 'https://dog.ceo/api/breed/'
        const bURL = '/images/random'
        let addictionalURlPath = sub.length === 0 ? `${main}` : `${main}/${sub}`;

        const fullURL = fURL + addictionalURlPath + bURL;

        const { data } = await axios.get(fullURL);
        const { message: imagePath } = data;

        return imagePath;
    }

    return { fetchRandomImage }
}