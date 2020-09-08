import {
  Directive,
  Input,
  ViewContainerRef,
  TemplateRef,
  OnInit,
} from '@angular/core';


import * as fromServices from '../services';


@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[];
  isVisible = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private service: fromServices.AuthService
  ) {
  }

  ngOnInit() {
    const userRoles = this.service.getLoggedUserRoles();

    if (!userRoles) {
      return this.viewContainerRef.clear();
    }

    if (this.roleMatch(this.appHasRole, userRoles)) {
      if (!this.isVisible) {
        this.isVisible = true;
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.isVisible = false;
        this.viewContainerRef.clear();
      }
    }
  }

  roleMatch(allowedRoles: Array<string>, userRoles: Array<string>): boolean {
    let isMatch = false;
    allowedRoles.forEach(role => {
      if (userRoles.includes(role)) {
        isMatch = true;
        return;
      }
    });

    return isMatch;
  }
}
