import {Injectable} from '@angular/core';


@Injectable()
export class EnvironmentService {
  public apiUrl: string;
  public isSigningUpEnabled: boolean;
  public wsEventsUrl: string;
  public whitelistedDomains: string[] = [];
  public blacklistedRoutes: string[] = [];
}
