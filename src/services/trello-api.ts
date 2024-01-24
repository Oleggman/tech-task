import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "https://api.trello.com/1/";
const username: string | undefined = process.env.REACT_APP_USERNAME;
const apiKey: string | undefined = process.env.REACT_APP_API_KEY;
const token: string | undefined = process.env.REACT_APP_TOKEN;

export const getAllBoards = async () => { 
    const res: AxiosResponse<any, any> =
        await axios.get(`/members/${username}/boards?key=${apiKey}&token=${token}&fields=name`);
    return res.data;
};

export const getBoardById = async (id: string | undefined) => {
    const res: AxiosResponse<any, any> =
        await axios.get(`/boards/${id}?fields=id,name&lists=open&list_fields=id,name&key=${apiKey}&token=${token}`);
    return res.data;
}