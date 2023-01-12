import debounce from "lodash/debounce";
import { ChangeEventHandler, HTMLAttributes } from "react";
import { Input } from "react-daisyui";

/** @jsxImportSource @emotion/react */
interface IProps extends Omit<HTMLAttributes<HTMLInputElement>, "onChange"> {
	placeholder: string;
	variant?: "borderless" | "default";
	onChange: (value: string) => void;
	size: "xs" | "sm" | "md" | "lg";
}

export const SearchInput = ({
	className,
	placeholder = "Search...",
	onChange,
	variant = "default",
	size = "sm",
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
		<div className={className}>
			{/* <i>
				<FontAwesomeIcon icon="search" />
			</i> */}

			{variant === "default" && (
				<Input
					type="search"
					bordered
					placeholder={placeholder}
					onChange={handleKeyUp}
					size={size}
				/>
			)}

			{variant === "borderless" && (
				<Input
					type="search"
					placeholder={placeholder}
					onChange={handleKeyUp}
					size={size}
				/>
			)}
		</div>
	);
};

export default SearchInput;
