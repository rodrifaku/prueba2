export interface UsuarioLogin{
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: "female" | "male";
  image: string;
  token: string;
}
