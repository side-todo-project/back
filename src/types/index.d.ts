declare namespace Express {
  interface Request {
    user?: {
      email: string;
      socialId: string;
    };
  }
}
