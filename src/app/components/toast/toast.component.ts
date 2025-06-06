import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent{
  @Input() message:string = '';
  @Input() type:number = 0; // 0 = success, 1 = error
  constructor(){
    this.message = '';
    this.type = 0;
  }
}
