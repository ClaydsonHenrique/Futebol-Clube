export interface Teams {
  id: number;
  teamName: string;
}

export interface TeamsServices {
  status: number;
  data: object;
}

export interface teamID {
  status: number;
  data: {
    id: number;
    teamName: string;
  };
}
