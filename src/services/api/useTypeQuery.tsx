/**
 * @format
 * @jsxImportSource @emotion/react
 */

import React from "react";

import { QueryFunction, useQuery } from "react-query";

import { getApiInstance } from "./getApiInstance";

export const useTypeQuery: QueryFunction<any> = async ({ queryKey }) => {
  const [_key] = queryKey as [string];

  const response = await getApiInstance().get(`/type`);

  return response.data;
};

export const useTypeListQuery = () => {
  return useQuery<any>(["Type"], useTypeQuery);
};
