export interface CreateUser {
  name: string;
  class: string;
  token?: string;
}

export interface User extends CreateUser {
  id: number;
}
