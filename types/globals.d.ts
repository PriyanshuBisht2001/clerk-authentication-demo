export {};

export type Role = "admin" | "moderator" ;

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Role;
    };
  }
}
