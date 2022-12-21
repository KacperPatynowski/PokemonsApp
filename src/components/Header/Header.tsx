import { Box } from "@mui/material";

export const Header = () => {
	return (
		<Box className="w-full h-16 p-2 bg-red-500">
			<Box className="flex h-full justify-center items-center bg-white shadow-xl rounded-box">
				<a>Witaj name z regionu region a twój startowy pokemon to</a>
			</Box>
		</Box>
	);
};
