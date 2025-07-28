import ClerkJWTClaims from "./clerk-jwt-claims";

declare global {
  namespace Express {
    interface Request {
      user?: ClerkJWTClaims;
    }
  }
}