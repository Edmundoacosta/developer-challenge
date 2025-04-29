import { Component } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { faUser, faCaretDown, faCaretUp, faSuitcase, faCross } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public currentUser:string = '';
  public openUserDropdown:boolean = false;
  public faUser = faUser;
  public faSuitcase = faSuitcase;
  public faCaretDown = faCaretDown;
  public faCaretUp = faCaretUp;
  public faCross = faCross;
  public itemDropdown: {titleDropdown?: string, type:number, currentUser:string} = {
    titleDropdown: 'Your workspace',
    currentUser: '',
    type: 0
  };
  public headerList:Array<any> = [
    { id: 0, name: 'Workspaces', open: false, dropdownTitle: 'Your workspace' },
    { id: 1, name: 'Recent', open: false, dropdownTitle: 'Prueba' },
    { id: 2, name: 'Create', open: false, dropdownTitle: 'Create new board' },
  ]
  constructor(private sessionS: SessionService){
    this.sessionS.loadInitialItems();
    this.sessionS.users.subscribe((users) => {
      const user = users.find(user => user.email == JSON.parse(localStorage.getItem('user') || '{}').email);
      if (user) {
        this.currentUser = user.fullname;
      }
    });
  }

  openDropdown(item:any){
    this.headerList.forEach((i) => {
      if (i.id !== item.id) {
        i.open = false;
      }
    });
    item.open = !item.open;
    this.itemDropdown = {
      titleDropdown: item.dropdownTitle,
      currentUser: this.currentUser,
      type: item.id
    };
    this.openUserDropdown = false;
  }

  openDropdownUser(){
    this.itemDropdown = {
      titleDropdown: '',
      currentUser: this.currentUser,
      type: 3
    };
    this.headerList.forEach(i => i.open = false );
    this.openUserDropdown = !this.openUserDropdown;
  }
}
