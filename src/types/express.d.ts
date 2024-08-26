interface User {
  id: number;
  email: string;
  password: string;
  name?: string;
  todos?: Todo[];
  createdAt?: Date;
  updatedAt?: Date;
}
declare global {
  namespace Express {
    interface Request {
      user?: User; // Add the user property to the Request interface
    }
  }
}
