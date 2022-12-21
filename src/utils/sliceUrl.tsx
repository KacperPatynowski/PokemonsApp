export const sliceUrl = (string: string) => {
	const slicedUrl = (string: string) => {
		const slicedString = string.slice(26, -1);

		return slicedString;
	};

	const response = slicedUrl(string);

	return response;
};

export default sliceUrl;
