declare namespace Express {
  interface Request {
    userId?: number;
    user?: {
      email: string;
      socialId: string;
    };
  }
}
