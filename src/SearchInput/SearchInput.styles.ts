/** @format */

import { css } from "@emotion/react";

export const wrapper = css`
  display: inline-flex;
  align-items: center;
`;

export const iconSearch = css`
  display: inherit;
  color: #cecfd2;
  font-size: 1.125rem;
  margin-right: 8px;
`;

export const inputSearch = css`
  height: 37px;
`;

export const inputBorderless = css`
  box-shadow: none;
  border: 0;
  padding: 11px 4px;
  &:focus {
    border-color: transparent;
    box-shadow: none;
  }
`;
