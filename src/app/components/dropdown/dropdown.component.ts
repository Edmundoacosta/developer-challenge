import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faSuitcase, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  public faSuitcase = faSuitcase;
  public faCross = faXmark;

  @Input() item: {titleDropdown?: string, type:number, currentUser:string} = {
    titleDropdown: 'Your workspace',
    currentUser: '',
    type: 0
  };
  @Input() open: boolean = false;
  @Output() openDropdown = new EventEmitter<any>();
  public colors:Array<any> = [
    { hex: '#FFB800', name: 'yellow', selected: true },
    { hex: '#FF3D00', name: 'red', selected: false },
    { hex: '#00B9FF', name: 'blue', selected: false },
    { hex: '#00C853', name: 'green', selected: false },
  ]
  constructor() {}

  openDropdownItem(item: any): void {
    this.openDropdown.emit(item);
  }

  selectColor(color: any): void {
    this.colors.forEach((c) => {
      c.selected = false;
    });
    color.selected = true;
  }

  closeDropdown(){
    this.open = false;
  }
}