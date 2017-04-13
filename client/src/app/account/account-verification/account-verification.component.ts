import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilityService} from "app/shared/utility.service";
import {AccountService} from "app/account/shared/account.service";
import {C2sUiApiUrlService} from "app/shared/c2s-ui-api-url.service";
import {NotificationService} from "app/core/notification.service";
import {AccountVerificationRequest} from "app/account/shared/account-verification-request.model";
import {AccountVerificationService} from "app/account/shared/account-verification.service";

@Component({
  selector: 'c2s-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.scss']
})
export class AccountVerificationComponent implements OnInit {
  public accountVerificationFrom: FormGroup;
  public FORMAT: string = "MM/DD/YYYY";
  public today: Date = new Date();
  private emailToken: string;

  constructor(private accountService: AccountService,
              private accountVerificationService: AccountVerificationService,
              private c2sUiApiUrlService: C2sUiApiUrlService,
              private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.accountVerificationFrom = this.formBuilder.group({
      birthDate: ['', Validators.required],
      verificationCode: ['', Validators.required]
    });
    this.emailToken = this.accountVerificationService.retrieveEmailToken(this.utilityService.getCurrentNormalizedPath());
  }

  public clear() {
    this.accountVerificationFrom.reset();
  }

  public verify() {
    this.accountService.verifyAccount(this.prepareVerificationAccount())
      .subscribe(
        (verificationResponse) => {
          this.accountVerificationService.setVerificationInfo(this.prepareVerificationAccount());
          this.accountVerificationService.setUsername(verificationResponse.username);
          this.utilityService.navigateTo(this.c2sUiApiUrlService.getAccountActivationUrl())
        },
        err => {
          this.notificationService.show("Error in verifying user.");
          console.log(err);
        }
      );
  }

  private prepareVerificationAccount(): AccountVerificationRequest {
    const formModel = this.accountVerificationFrom.value;
    if (this.emailToken != null) {
      return {
        birthDate: new Date(formModel.birthDate),
        verificationCode: formModel.verificationCode,
        emailToken: this.emailToken
      };
    }
  }
}
