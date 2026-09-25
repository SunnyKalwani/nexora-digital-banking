import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './bills.html',
  styleUrl: './bills.scss'
})
export class Bills {}