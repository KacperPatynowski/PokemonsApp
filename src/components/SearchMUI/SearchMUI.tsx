// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
// import { Theme, useTheme } from "@mui/material/styles";
// import * as React from "react";
// import { useRegionQuery } from "services/api/useRegionQuery";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
// 	PaperProps: {
// 		style: {
// 			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
// 			width: 250,
// 		},
// 	},
// };

// // const names = [];

// // {regionResponse?.results?.map(
// //     (region: { name: string; url: string }) => {
// //         return (
// //             names.push(region.name))
// //     }
// // )}

// function getStyles(name: string, personName: string[], theme: Theme) {
// 	return {
// 		fontWeight:
// 			personName.indexOf(name) === -1
// 				? theme.typography.fontWeightRegular
// 				: theme.typography.fontWeightMedium,
// 	};
// }

// export default function MultipleSelect() {
// 	const theme = useTheme();
// 	const [personName, setPersonName] = React.useState<string[]>([]);
// 	const { data: regionResponse } = useRegionQuery();

// 	const handleChange = (event: SelectChangeEvent<typeof personName>) => {
// 		const {
// 			target: { value },
// 		} = event;
// 		setPersonName(
// 			// On autofill we get a stringified value.
// 			typeof value === "string" ? value.split(",") : value
// 		);
// 	};

// 	return (
// 		<div>
// 			<FormControl sx={{ m: 1, width: 300 }}>
// 				<InputLabel id="demo-multiple-name-label">Name</InputLabel>
// 				<Select
// 					labelId="demo-multiple-name-label"
// 					id="demo-multiple-name"
// 					multiple
// 					value={personName}
// 					onChange={handleChange}
// 					input={<OutlinedInput label="Name" />}
// 					MenuProps={MenuProps}
// 				>
// 					{regionResponse?.results?.map(
// 						(region: { name: string; url: string }) => {
// 							return (
// 								<MenuItem
// 									key={region.name}
// 									value={region.name}
// 									style={getStyles(region.name, personName, theme)}
// 								>
// 									{region.name}
// 								</MenuItem>
// 							);
// 						}
// 					)}
// 				</Select>
// 			</FormControl>
// 		</div>
// 	);
// }

interface Params {
	results: { name: string; url: string };
}

interface IProps {
	data: {
		results: { name: string; url: string }[];
	};
	label: string;
	id: string;
}

export const SearchMUI = ({ data, label, id }: IProps) => {
	const [age, setAge] = React.useState("");

	const handleChange = (event: SelectChangeEvent) => {
		setAge(event.target.value);
	};

	console.log(data);

	return (
		<div>
			<FormControl sx={{ m: 1, minWidth: 160 }}>
				<InputLabel id="demo-simple-select-autowidth-label">{label}</InputLabel>
				<Select
					labelId="demo-simple-select-autowidth-label"
					id={id}
					value={age}
					onChange={handleChange}
					autoWidth
					label={label}
				>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					{data?.results?.map((region: { name: string; url: string }) => {
						return (
							<MenuItem key={region.name} value={region.name}>
								{region.name}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
		</div>
	);
};

export default SearchMUI;
