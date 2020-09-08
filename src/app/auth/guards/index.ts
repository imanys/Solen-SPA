import {AuthGuard} from './auth.guard';
import {CheckPasswordTokenGuard} from './check-password-token.guard';

export const guards: any[] = [AuthGuard, CheckPasswordTokenGuard];

export * from './auth.guard';
export * from './check-password-token.guard';
