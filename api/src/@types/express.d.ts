declare namespace Express {
  export interface Request {
    user: {
      data: {
        id: string;
        // Mude aqui para permitir null
        profile: {
          permissions: { key: string }[];
        } | null; 
      };
    };
  }
}