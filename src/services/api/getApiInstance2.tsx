import axios, { AxiosInstance } from "axios";

let baseApiInstance2: AxiosInstance;

export const getApiInstance2 = () => {
	if (baseApiInstance2) {
		return baseApiInstance2;
	}

	axios.defaults.withCredentials = true;

	baseApiInstance2 = axios.create({
		withCredentials: false,
		headers: {},
	});

	return baseApiInstance2;
};
