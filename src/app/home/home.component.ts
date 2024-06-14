import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIcon} from "@angular/material/icon";
import {NgOptimizedImage} from "@angular/common";
import {trigger, state, style, transition, animate} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIcon, NgOptimizedImage],
  template: `
    @if (modal) {
      <div class="modal-overlay container" [@cardAnimation]="state" (click)="toggleState()">
        <mat-card>
          <div class="right">
            <button type="button" class="close" aria-label="Close" (click)="closeModal()">
              <span class="symbol" aria-hidden="true">&times;</span>
            </button>
          </div>
          <h4 class="text-center text-light">Welcome to my mind</h4>
          <img src="assets/images/brain.gif" alt="Brain Image" width="100" height="340"/>
        </mat-card>
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 20px;
      }

      h1 {
        font-size: 1.5em;
      }

      p {
        font-size: 1em;
        margin-top: 0;
        color: #333;
      }

      .container {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      mat-card {
        padding: 20px;
        background-color: #030303;
        width: 40%;
      }

      button {
        padding: 10px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        box-shadow: 3px 4px 2px rgba(0, 0, 0, 0.3);
      }

      button:hover {
        background-color: red;
      }

      .close {
        background-color: red;
        border-radius: 5px;
        padding: 12px 1rem 12px 1rem;
      }

      .symbol {
        color: #ffffff;
      }

      .right {
        float: right;
        margin-left: auto;
        margin-bottom: 10px;
      }

      img {
        width: 100%;
        max-height: 300px;
      }
    `,
  ],
  animations: [
    trigger('cardAnimation', [
      state('small', style({
        transform: 'scale(1)'
      })),
      state('large', style({
        transform: 'scale(1.2)'
      })),
      transition('small <=> large', animate('300ms ease-in-out'))
    ])
  ]
})
export class HomeComponent {
  modal: boolean = true
  state: string = 'small';

  constructor(private router: Router) { }

  ngOnInit() {
    this.toggleState();
  }

  navigateToHome() {
    this.router.navigate(['/main']);
  }

  ngOnDestroy() {
    if (this.modal) {
      this.modal = false;
    }
  }

  closeModal() {
    this.modal = false;
    this.navigateToHome();
  }

  toggleState() {
    setTimeout(() => {
      this.state = this.state === 'small' ? 'large' : 'small';
    }, 1000);
  }
}
