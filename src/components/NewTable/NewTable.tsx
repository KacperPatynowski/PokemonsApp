import AnchorIcon from "@mui/icons-material/Anchor";
import DifferenceIcon from "@mui/icons-material/Difference";
import ParkIcon from "@mui/icons-material/Park";
import { Avatar, Box, TableCell } from "@mui/material";
import { green } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { usePokemonsQuery } from "services/api/usePokemonsQuery";
import { useRegionQuery } from "services/api/useRegionQuery";
import { useTypeListQuery } from "services/api/useTypeQuery";
import { IPokemonDto } from "types/IPokemonDto";

interface Column {
	id: "id" | "PokemonName" | "Region" | "Type" | "Compare" | "Evolution";
	label: string;
	minWidth?: number;
	align?: "right";
	format?: (value: number) => string;
}

const columns: readonly Column[] = [
	{ id: "id", label: "Id", minWidth: 170 },
	{ id: "PokemonName", label: "PokemonName", minWidth: 100 },
	{
		id: "Type",
		label: "Type",
		minWidth: 170,
		align: "right",
		format: (value: number) => value.toLocaleString("en-US"),
	},
	{
		id: "Compare",
		label: "Compare",
		minWidth: 100,
		align: "right",
		format: (value: number) => value.toFixed(2),
	},
	{
		id: "Evolution",
		label: "Evolution",
		minWidth: 100,
		align: "right",
		format: (value: number) => value.toFixed(2),
	},
];

export default function NewTable() {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const { data: response } = usePokemonsQuery(page);

	const { data: regionResponse } = useRegionQuery();
	const { data: typeResponse } = useTypeListQuery();

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	if (response) {
		return (
			<Paper sx={{ width: "80%", overflow: "hidden", align: "center" }}>
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							{/* <TableRow
								sx={{
									height: 140,
								}}
							>
								<TableCell align="center" colSpan={1}>
									<SearchMUI data={regionResponse} label="Region" id="type" />
								</TableCell>
								<TableCell align="center" colSpan={2}>
									<SearchMUI data={typeResponse} label="Type" id="type" />
								</TableCell>
								<TableCell align="center" colSpan={3}>
									<TextField
										id="outlined-basic"
										label="Outlined"
										variant="outlined"
										margin="dense"
									/>
								</TableCell>
							</TableRow> */}
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{ minWidth: column.minWidth }}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{response
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map(({ data }: IPokemonDto) => {
									const { id, name, sprites, types } = data || {};
									return (
										<TableRow hover role="checkbox" tabIndex={-1} key={id}>
											{columns.map((column) => {
												const { id: columnId, align } = column;
												switch (columnId) {
													case "PokemonName":
														return (
															<TableCell key={columnId} align={align}>
																{sprites && (
																	<>
																		<Box sx={{ display: "flex", align: "" }}>
																			<Avatar
																				sx={{ display: "inline" }}
																				alt="pokemon"
																				src={sprites.front_default}
																			/>
																			<Box sx={{ display: "inline" }}>
																				{name}
																			</Box>
																		</Box>
																	</>
																)}
															</TableCell>
														);
													case "id":
														return (
															<TableCell key={columnId} align={align}>
																{id}
															</TableCell>
														);
													case "Compare":
														return (
															<TableCell key={columnId} align={align}>
																<AnchorIcon />
															</TableCell>
														);
													case "Evolution":
														return (
															<TableCell key={columnId} align={align}>
																<DifferenceIcon />
															</TableCell>
														);
													case "Type":
														return (
															<TableCell key={columnId} align={align}>
																{types && (
																	<>
																		<ParkIcon sx={{ color: green[500] }} />
																		<DifferenceIcon />
																	</>
																)}
															</TableCell>
														);
													default:
														return null;
												}
											})}
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={response.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		);
	} else return <p>refresh</p>;
}
