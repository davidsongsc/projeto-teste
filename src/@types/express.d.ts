declare namespace Express {
  export interface Request {
    user: {
      data: {
        id: string;
        profile: {
          permissions: Array<{ key: string }>;
        };
      };
    };
  }
}