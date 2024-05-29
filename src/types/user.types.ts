export interface User {
  id?: string;
  name?: string;
  username: string;
  password?: string;
}

export interface Login {
  username: string;
  password: string;
}
