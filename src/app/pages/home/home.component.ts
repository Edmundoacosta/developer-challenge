import { Component } from '@angular/core';
import { faTableColumns, faHeart, faEye, faUsers, faCog, faPlus, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('accordionAnimation', [
      state('collapsed', style({
        height: '0px',
        overflow: 'hidden',
        opacity: 0
      })),
      state('expanded', style({
        height: '*',
        overflow: 'hidden',
        opacity: 1
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class HomeComponent {
  public faPlus:any = faPlus;
  public faCaretDown:any = faCaretDown;
  public faCaretUp:any = faCaretUp;
  public valuesMenu = [
    { name: 'Boards', active: true, icon: faTableColumns},
    { name: 'Templates', active: false, icon: faTableColumns},
    { name: 'Home', active: false, icon: faTableColumns }
  ];
  public currentSide:string = 'Boards';
  public workspaces = [
    { 
      name: 'Edmundoacosta2305 workspace',
      dropdown: false,
      items: [
        { name: 'Boards', icon: faTableColumns },
        { name: 'Highlights', icon: faHeart },
        { name: 'Views', icon: faEye },
        { name: 'Users', icon: faUsers },
        { name: 'Settings', icon: faCog }
      ]
    },
    {
      name: 'Gabrielaalcantara1812 workspace',
      dropdown: false,
      items: [
        { name: 'Boards', icon: faTableColumns },
        { name: 'Highlights', icon: faHeart },
        { name: 'Views', icon: faEye },
        { name: 'Users', icon: faUsers },
        { name: 'Settings', icon: faCog }
      ]
    }
  ]
  changeSection(section:any): void{
    this.currentSide = section.name;
    this.valuesMenu.forEach((item) => {
      item.active = false;
    });
    section.active = true;
  }

  openDropdown(workspace:any): void {
    workspace.dropdown = !workspace.dropdown;
  }
}
