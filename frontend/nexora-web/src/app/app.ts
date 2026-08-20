import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  appName = 'NEXORA';
  tagline = 'Intelligent Digital Banking';
  description = "Secure. Simple. Built for what's next.";

  enterApp(){
    console.log('entering nexora banking platform');
  }
}
