export type User = {
  email: string;
  password: string;
  name: string;
};
export type UserLogin = Omit<User, 'name'>;
export type UserRegister = User;
