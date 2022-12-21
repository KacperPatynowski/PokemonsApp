export interface IPokemonChainDto {
	data: {
		chain: {
			species: {
				name: string;
			};
			evolves_to: {
				evolves_to: {
					evolves_to?: {
						species: {
							name: string;
						};
					}[];

					species: {
						name: string;
					};
				}[];
				species: {
					name: string;
				};
			}[];
		};
	};
}
