import axios, { AxiosInstance } from "axios";

let baseApiInstance: AxiosInstance;

export const getApiInstance = () => {
	if (baseApiInstance) {
		return baseApiInstance;
	}

	axios.defaults.withCredentials = true;

	baseApiInstance = axios.create({
		withCredentials: false,
		baseURL: "https://pokeapi.co/api/v2/",
		headers: {},
	});

	return baseApiInstance;
};
