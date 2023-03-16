import React from "react";
import { useState } from "react";
import { QueryFunction, useQuery } from "react-query";

import { getApiInstance } from "./getApiInstance";

/** @jsxImportSource @emotion/react */
interface IResults {
	name: string;
	url: string;
}

export const useRegionListQuery: QueryFunction<any> = async ({ queryKey }) => {
	const [_key] = queryKey as [string];

	const response: any = await getApiInstance().get(`/region`);
	console.log(response);

	return response.data;
};

export const useRegionQuery = () => {
	return useQuery<any>(["Region"], useRegionListQuery);
};
