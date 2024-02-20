import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';
import { AES, enc } from "crypto-js"

@Component({
  selector: 'app-password-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './password-list.component.html',
  styleUrl: './password-list.component.css'
})
export class PasswordListComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  passwordManagerService = inject(PasswordManagerService);

  siteId!: string;
  siteName!: string;
  siteURL!: string;
  siteImgURL!: string;

  passwordList!: Array<any>;

  email!: string;
  username!: string;
  password!: string;
  passwordId!: string;

  formState: string = "Add New";

  isSuccess: boolean = false;
  alertMessage: string = "";
  alertColor: string = "";

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((val: any) => {
      this.siteId = val.id;
      this.siteName = val.siteName;
      this.siteURL = val.siteURL;
      this.siteImgURL = val.siteImgURL;
    });

    this.getAllPasswords();
  }

  resetForm() {
    this.email = "";
    this.username = "";
    this.password = "";

    this.formState = "Add New";
    this.passwordId = "";
  }

  onSubmit(values: any) {
    const encryptedPassword = this.encryptPassword(values.password);
    values.password = encryptedPassword;

    if (this.formState === "Add New") {
      this.passwordManagerService.addPassword(values, this.siteId)
        .then(() => {
          console.log("Password added successfully!");
          this.showToast("added", "bg-success");
          this.resetForm();
        })
        .catch(err => {
          console.log(err);
        });
    } else if (this.formState === "Edit") {
      this.passwordManagerService.updatePassword(this.siteId, this.passwordId, values)
        .then(() => {
          console.log("Password updated successfully!");
          this.showToast("updated", "bg-info");
          this.resetForm();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  getAllPasswords() {
    this.passwordManagerService.getAllPasswords(this.siteId)
      .subscribe(val => {
        this.passwordList = val;
      });
  }

  editPassword(email: string, username: string, password: string, passwordId: string) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.passwordId = passwordId;

    this.formState = "Edit";
  }

  deletePassword(passwordId: string) {
    this.passwordManagerService.deletePassword(this.siteId, passwordId)
      .then(() => {
        console.log("Password deleted successfully!");
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

  encryptPassword(password: string) {
    const secretKey = "j+QXyRS9bW/cJbK0FpbgEuribPidLNt9nAofwIilfqRAW/Q9LpRZnt6xJLhx1tAf";

    const encryptedPassword = AES.encrypt(password, secretKey).toString();
    return encryptedPassword;
  }

  decryptPassword(password: string) {
    const secretKey = "j+QXyRS9bW/cJbK0FpbgEuribPidLNt9nAofwIilfqRAW/Q9LpRZnt6xJLhx1tAf";

    const decryptedPassword = AES.decrypt(password, secretKey).toString(enc.Utf8);
    return decryptedPassword;
  }

  onDecrypt(password: string, index: number) {
    const decryptedPassword = this.decryptPassword(password);
    this.passwordList[index].password = decryptedPassword;
  }
}
