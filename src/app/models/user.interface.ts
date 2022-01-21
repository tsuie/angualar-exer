export interface IUser {
  data: {
    id: number,
    name: string,
    email: string,
    username: string,
    password: string,
    password_confirm: string,
    user_type: string
  },
  token: string,
}
