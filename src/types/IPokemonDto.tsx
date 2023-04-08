/** @format */

export interface IPokemonDto {
  data: {
    id: number;
    name: string;
    evolution_chain: {
      url: string;
    };
    sprites: {
      front_default: string;
      other: {
        dream_world: {
          front_default: string;
        };
      };
    };
    species: {
      name: string;
      url: string;
    };
    types: [
      {
        slot: string;
        type: {
          name: string;
        };
      },
    ];
    stats: {
      base_stat: number;
      effort: string;
      stat: {
        name: string;
      };
    }[];
  };
}
