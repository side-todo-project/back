declare namespace Express {
  interface Request {
    userEmail?: string;
    user?: {
      email: string;
      socialId: string;
    };
  }
}
