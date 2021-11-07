import {
  Directive,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  Input,
} from "@angular/core";
import { AccountService } from "src/app/auth/services/account.service";
import { AuthService } from "src/app/auth/services/auth.services";
import { Role } from "../models/roles";

@Directive({ selector: "[appPermission]" })
export class HasPermissionDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private authService: AccountService,
    private viewContainer: ViewContainerRef
  ) {}

  permissions: string[];

  @Input()
  set appPermission(permissions: string[]) {
    if (!permissions || !permissions.length) {
      return;
    }

    this.permissions = permissions;
  }

  ngOnInit() {
    let hasAccess = false;

    if (this.authService.isAuthenticated() && this.permissions) {
      hasAccess = this.permissions.some((r) =>
        this.authService.hasPermission(r)
      );
    }

    if (hasAccess) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
