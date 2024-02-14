export interface User {
  _id: string; // Необязательное поле, предполагается, что id будет генерироваться сервером
  username: string;
  email: string;
  age: number;
  password: string;
}
