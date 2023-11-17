import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  @Input() collapsed =false;
  @Input() screenWidth = 0;
  constructor(private router:Router){
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd)
      {
        this.shouldShowBody();
      }
    } )
  }
  getBodyClass():string{
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768){
      styleClass='body-trimmed';
    }else if(this.collapsed && this.screenWidth <=768 && this.screenWidth > 0){
      styleClass="body-md-screen"
    }
    return styleClass;
  }

  shouldShowBody(): boolean {
    return !this.router.url.includes('/login');
  }
}
