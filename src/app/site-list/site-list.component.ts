import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-site-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './site-list.component.html',
  styleUrl: './site-list.component.css'
})
export class SiteListComponent implements OnInit {
  passwordManagerService = inject(PasswordManagerService);
  allSites!: Observable<Array<any>>;

  ngOnInit(): void {
    this.getAllSites();
  }



  onSubmit(values: NgForm) {
    this.passwordManagerService.addSite(values)
      .then(() => {
        console.log("Data saved successfully!");      
      })
      .catch(err => {
        console.log(err);        
      });
  }

  getAllSites() {
    this.allSites = this.passwordManagerService.getAllSites();
  }
}
