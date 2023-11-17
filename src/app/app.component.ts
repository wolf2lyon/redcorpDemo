import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RedCorp';
  isSideNavCollapsed =false;
  screenWidth=0;
  constructor(private router : Router){
    this.router.events.subscribe(event => {
      if( event instanceof NavigationEnd)
      {
        this.shouldShowSideNav();
      }
    })
  }
  onToggleSideNav(data:SideNavToggle):void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed
  }

  shouldShowSideNav(): boolean {
    return !this.router.url.includes('/login');
  }
  shouldShowLogin(): boolean {
    return this.router.url.includes('/login');
  }
}
