import axios, { AxiosInstance } from "axios";

let baseApiInstancenoUrl: AxiosInstance;

export const getApiInstanceNoUrl = () => {
	if (baseApiInstancenoUrl) {
		return baseApiInstancenoUrl;
	}

	axios.defaults.withCredentials = true;

	baseApiInstancenoUrl = axios.create({
		withCredentials: false,
		headers: {},
	});

	return baseApiInstancenoUrl;
};
