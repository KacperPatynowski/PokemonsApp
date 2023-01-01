import { Box } from "@mui/material";
import { StyledSearchInput } from "components/StyledInput";

export const Header = () => {
	return (
		<Box className="w-full h-16 p-2 bg-red-500">
			<Box className="flex h-full bg-white shadow-xl rounded-box">
				<Box className="m-2">
					<a>asdas</a>
				</Box>
				<Box className="ml-auto m-2">
					<StyledSearchInput />
				</Box>
			</Box>
		</Box>
	);
};
