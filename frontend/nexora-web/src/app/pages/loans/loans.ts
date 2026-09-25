import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './loans.html',
  styleUrl: './loans.scss'
})
export class Loans {}