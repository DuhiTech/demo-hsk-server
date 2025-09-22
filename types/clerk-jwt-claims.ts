import { JwtPayload } from '@clerk/types';
import UserMetadata from './user-metadata';

type ClerkJWTClaims = JwtPayload & {
  public_metadata: UserMetadata
}

export default ClerkJWTClaims;
