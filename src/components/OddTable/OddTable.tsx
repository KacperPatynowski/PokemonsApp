import {
    Air as AirIcon,
    AutoAwesome as AutoAwesomeIcon,
    Bolt as BoltIcon,
    Brightness5 as Brightness5Icon,
    FilterDrama as FilterDramaIcon,
    FilterHdr as FilterHdrIcon,
    FilterVintage as FilterVintageIcon,
    Grass as GrassIcon,
    Icecream as IcecreamIcon,
    LocalFireDepartment as LocalFireDepartmentIcon,
    Nature as NatureIcon,
    NightsStay as NightsStayIcon,
    PestControl as PestControlIcon,
    Pets as PetsIcon,
    PrecisionManufacturing as PrecisionManufacturingIcon,
    QuestionMark as QuestionMarkIcon,
    SportsMma as SportsMmaIcon,
    Storm as StormIcon,
    Warning as WarningIcon,
    Water as WaterIcon,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import * as React from "react";
import { usePokemonsQuery } from "services/api/usePokemonsQuery";
import { IPokemonDto } from "types/IPokemonDto";

export default function OddTable() {
	const [page, setPage] = React.useState(0);

	const { data: response } = usePokemonsQuery(page);

	const handleClick = () => {};

	const iconSelect = (type: string) => {
		const typeToIcon = {
			normal: <NatureIcon />,
			fight: <SportsMmaIcon />,
			fly: <AirIcon />,
			poison: <WarningIcon />,
			ground: <FilterVintageIcon />,
			rock: <FilterHdrIcon />,
			bug: <PestControlIcon />,
			ghost: <FilterDramaIcon />,
			steel: <PrecisionManufacturingIcon />,
			fire: <LocalFireDepartmentIcon />,
			water: <WaterIcon />,
			grass: <GrassIcon />,
			electric: <BoltIcon />,
			physic: <StormIcon />,
			ice: <IcecreamIcon />,
			dragon: <PetsIcon />,
			dark: <NightsStayIcon />,
			fairy: <AutoAwesomeIcon />,
			unknown: <QuestionMarkIcon />,
			shadow: <Brightness5Icon />,
		};
		return typeToIcon[type as keyof typeof typeToIcon];
	};

	if (response) {
		return (
			<div className="">
				<Paper sx={{ width: "100%", overflow: "hidden", align: "center" }}>
					<Box sx={{ margin: "auto" }}>
						<div className="flex flex-col gap-2 justify-center items-center">
							{response.map(({ data }: IPokemonDto) => {
								const { id, name, sprites, types } = data || {};

								return (
									<div className="card w-96 bg-red-100 shadow-xl hover:[transform:rotateY(180deg)] [transform-style:preserve-3d] [transition:all] [transition:ease] [transition:0.5s]">
										<span className="m-4 text-base font-mono">{id}</span>
										<figure>
											<img
												src={sprites?.front_default}
												alt="Shoes"
												className="w-36 h-36"
											/>
										</figure>
										<div className="card-body items-center text-center">
											<h2 className="card-title ">{name}</h2>
											<div className="m-4">
												{types?.map((type) => {
													return iconSelect(type.type.name);
												})}
											</div>

											<div className="card-actions justify-end">
												<button className="btn btn-primary">Compare</button>
												<button className="btn btn-primary">Evolves</button>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</Box>
				</Paper>
			</div>
		);
	} else return <p>refresh</p>;
}
