import { JwtPayload } from '@clerk/types';
import { Role } from './enums';

type ClerkJWTClaims = JwtPayload & {
  public_metadata: {
    id: string,
    role: Role
  }
}

export default ClerkJWTClaims;
