import {
  Directive,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  Input,
} from "@angular/core";
import { AuthService } from "src/app/auth/services/auth.services";
import { Role } from "../models/roles";

@Directive({ selector: "[appUserRole]" })
export class HasRoleDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private authService: AuthService,
    private viewContainer: ViewContainerRef
  ) {}

  userRoles: string[];

  @Input()
  set appUserRole(roles: string[]) {
    if (!roles || !roles.length) {
      console.log("No roles available");
    }

    this.userRoles = roles;
  }

  ngOnInit() {
    let hasAccess = false;

    if (this.authService.isAuthenticated() && this.userRoles) {
      hasAccess = this.userRoles.some((r) => this.authService.hasRole(r));
    }

    if (hasAccess) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
