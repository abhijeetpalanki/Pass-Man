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
  siteName!: string;
  siteURL!: string;
  siteImgURL!: string;
  siteId!: string;

  formState: string = "Add New";

  isSuccess: boolean = false;
  alertMessage: string = "";
  alertColor: string = "";

  ngOnInit(): void {
    this.getAllSites();
  }

  onSubmit(values: NgForm) {
    if (this.formState === "Add New") {
      this.passwordManagerService.addSite(values)
        .then(() => {
          console.log("Data added successfully!");
          this.showToast("added", "bg-success");
        })
        .catch(err => {
          console.log(err);
        });
    } else if (this.formState === "Edit") {
      this.passwordManagerService.updateSite(this.siteId, values)
        .then(() => {
          console.log("Data updated successfully!");
          this.showToast("updated", "bg-info");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  getAllSites() {
    this.allSites = this.passwordManagerService.getAllSites();
  }

  editSite(siteName: string, siteURL: string, siteImgURL: string, id: string) {
    this.siteName = siteName;
    this.siteURL = siteURL;
    this.siteImgURL = siteImgURL;
    this.siteId = id;
    this.formState = "Edit";
  }

  deleteSite(id: string) {
    this.passwordManagerService.deleteSite(id)
      .then(() => {
        console.log("Data deleted successfully!");
        this.showToast("deleted", "bg-danger");
      })
      .catch(err => {
        console.log(err);
      });
  }

  showToast(message: string, bgColor: string) {
    this.isSuccess = true;
    this.alertMessage = message;
    this.alertColor = bgColor;
  }
}
