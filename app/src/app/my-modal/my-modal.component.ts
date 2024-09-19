import { Component ,Input,Output } from '@angular/core';

@Component({
  selector: 'app-my-modal',
  standalone: true,
  imports: [],
  templateUrl: './my-modal.component.html',
  styleUrl: './my-modal.component.css'
})
export class MyModalComponent {
  @Input() modalId: string = '';
  @Input()  title: string = '';
}
