// 1. create directory of components
// 2. create component ts file
// 3. create component html file
// 4. export class component in ts file
// 5. @Component({}) in ts file
// 6. import modules in app.module.ts , import modules in NgModule imports  & add component to NgModule declarations
// 7. add selector of component to app.component.html

import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth-service";

@Component({
    selector: 'app-header',
    templateUrl: './header-component.html',
    styleUrls: ['./header-component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  onLogout() {
    this.authService.logout()
  }

  ngOnDestroy() {

  }
}
