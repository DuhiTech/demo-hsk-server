import { SetMetadata } from '@nestjs/common';
import { Role } from 'types/enums/role.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
