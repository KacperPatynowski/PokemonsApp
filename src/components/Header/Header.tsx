import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

interface IProps {
	trainerName: string;
	region: string;
	pokemon: string;
}

export const Header = () => {
	const location = useLocation();
	// console.log(location.state);
	return (
		<Box className="w-full h-16 p-2 bg-red-500">
			<Box className="flex justify-end h-full bg-white shadow-xl rounded-box">
				<Box className="m-2">
					<a>
						Witaj trenerze {location.state.name} z regionu{" "}
						{location.state.region} a twój startowy pokemon to{" "}
						{location.state.pokemon}{" "}
					</a>
				</Box>
			</Box>
		</Box>
	);
};
