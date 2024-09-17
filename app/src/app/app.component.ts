import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SignInComponent } from './sign-in/sign-in.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, SignInComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Use "styleUrls" (plural)
})
export class AppComponent  {
  token: string | undefined = '';

  ngOnInit() {
    this.token = localStorage.getItem('angular_token')!;
  }
}
