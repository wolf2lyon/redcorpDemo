import { Component, Input, OnInit } from '@angular/core';
import { INavbarData, fadeInOut } from './helper';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-sublevel-menu',
  template: ` <ul
    *ngIf="collapsed && data.items && data.items.length > 0"
    [class.visible]="expanded"
    [class.hidden]="!expanded"
    [class.animating]="animating"
    class="sublevel-nav"
  >
    <li *ngFor="let item of data.items" class="sublevel-nav-item">
      <ng-container *ngIf="item.rol === rolUser || rolUser === 'ADMIN' ">
        <a
          class="sublevel-nav-link"
          (click)="handleClick(item)"
          *ngIf="item.items && item.items.length > 0"
        >
          <span class="sublevel-link-text" @fadeInOut *ngIf="collapsed">{{
            item.label
          }}</span>
          <i
            *ngIf="item.items && collapsed"
            class="menu-collapse-icon"
            [ngClass]="
              !item.expanded
                ? 'fa-solid fa-angle-right'
                : 'fa-solid fa-angle-down'
            "
          ></i>
        </a>
        <a
          class="sublevel-nav-link"
          *ngIf="!item.items || (item.items && item.items.length === 0)"
          [routerLink]="[item.routelink]"
          routerLinkActive="active-sublevel"
          [routerLinkActiveOptions]="{ exact: true }"
        >
          <span class="sublevel-link-text" @fadeInOut *ngIf="collapsed">{{
            item.label
          }}</span>
        </a>
      </ng-container>
      <div *ngIf="item.items && item.items.length > 0">
        <app-sublevel-menu
          [data]="item"
          [collapsed]="collapsed"
          [multiple]="multiple"
          [expanded]="item.expanded"
        >
        </app-sublevel-menu>
      </div>
    </li>
  </ul>`,
  styleUrls: ['./sidenav.component.scss'],
  animations: [fadeInOut],
})
export class SublevelMenuComponent implements OnInit {
  @Input() data: INavbarData = {
    routelink: '',
    icon: '',
    label: '',
    items: [],
    rol:'',
  };
  @Input() collapsed = false;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean = false;
  @Input() rolUser:string | undefined;

  constructor( private authService:AuthService) {}

  ngOnInit(): void {
    this.rolUser = this.authService.showRole();
  }

  handleClick(item: any): void {
    if (!this.multiple) {
      if (this.data.items && this.data.items.length > 0) {
        for (let modelItem of this.data.items) {
          if (item !== modelItem && modelItem.expanded) {
            modelItem.expanded = false;
          }
        }
      }
    }

    item.expanded = !item.expanded;
    console.log(item.expanded);
    console.log('hola');
  }
}
