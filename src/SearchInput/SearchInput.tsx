/**
 * @format
 * @fomat
 */

/** @jsxImportSource @emotion/react */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import debounce from "lodash/debounce";
import { ChangeEventHandler, HTMLAttributes } from "react";
import { Input } from "reactstrap";

import * as styles from "./SearchInput.styles";

interface IProps extends Omit<HTMLAttributes<HTMLInputElement>, "onChange"> {
  placeholder: string;
  variant?: "borderless" | "default";
  onChange: (value: string) => void;
}

export const SearchInput = ({
  className,
  placeholder = "Search...",
  onChange,
  variant = "default",
}: IProps) => {
  const debounceSearch = debounce((val: string) => onChange(val), 400);

  const handleKeyUp: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    const trimmedValue = value.trim();
    if (trimmedValue.length > 2 || trimmedValue.length === 0) {
      debounceSearch(trimmedValue);
    }
  };

  return (
    <div className={className} css={styles.wrapper}>
      <i css={styles.iconSearch}>
        <FontAwesomeIcon icon="search" />
      </i>

      {variant === "default" && (
        <Input
          type="search"
          css={styles.inputSearch}
          placeholder={placeholder}
          onChange={handleKeyUp}
        />
      )}

      {variant === "borderless" && (
        <Input
          type="search"
          css={[styles.inputSearch, styles.inputBorderless]}
          placeholder={placeholder}
          onChange={handleKeyUp}
        />
      )}
    </div>
  );
};
