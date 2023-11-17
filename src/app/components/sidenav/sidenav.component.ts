import { Component, EventEmitter, Output,HostListener } from '@angular/core';
import { navbarData } from './nav-data';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { INavbarData, fadeInOut } from './helper';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations:[
    fadeInOut,
    trigger('rotate',[
      transition(':enter',[
        animate('1000ms',
        keyframes([
          style({transform:'rotate(0deg)',offset:'0'}),
          style({transform:'rotate(2turn)',offset:'1'}),
        ])
        )
      ])
    ])
  ]
})
export class SidenavComponent {
  constructor(private router:Router,private authService:AuthService){

  }
  @Output() onToggleSideNav:EventEmitter<SideNavToggle> = new EventEmitter()
  collapsed = false;
  screenWidth=0;
  navData = navbarData;
  multiple:boolean = false;
  rolUser:string='';
  @HostListener("window:resize",['$event'])
  onResize(event:any){
    this.screenWidth  = window.innerWidth;
    if(this.screenWidth <= 768){
      this.collapsed=false
      this.onToggleSideNav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth})
    }
  }

  ngOnInit(){
    this.screenWidth = window.innerWidth;
    this.rolUser = this.authService.showRole();
  }
  toggleCollapse():void{
    this.collapsed=!this.collapsed
    this.onToggleSideNav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth})
  }
  closeSidenav():void{
    this.collapsed =false
    this.onToggleSideNav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth})
  }
  handleClick(item:INavbarData):void{
    if(!this.multiple)
    {
      for(let modelItem of this.navData)
      {
        if(item !== modelItem && modelItem.expanded)
        {
          modelItem.expanded = false
        }
      }
    }
    item.expanded = !item.expanded
  }
  cerrarSesion(){
    localStorage.removeItem('jwttoken');
    this.router.navigate(['login']);
  }
  
}
