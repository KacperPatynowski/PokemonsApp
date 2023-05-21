export interface iPokemonEvolveDto {
  data: {
    chain: {
      evolves_to: 
        {
          evolves_to: 
            {
              species: {
                name: string;
              };
            }[]
           | [];
          species: {
            name: string;
          };
        }[]
      ;
      species: {
        name: string;
      };
    };
  };
}
