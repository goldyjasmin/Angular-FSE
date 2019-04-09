import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { LocalStorage } from '@ngx-pwa/local-storage';
import { Feedback } from './model/feedback';
import { FeedbackService } from './service/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private feedbackService: FeedbackService
  ) {}
  form: FormGroup;
  userType: number;
  userId: number;
  eventId: string;
  isTypeOne_Users: boolean;
  isNonTypeOne_Users;
  formSubmitted: boolean;
  rating: number;
  feedbackOption: any;
  feedbackDetails: Feedback;
  isRatingClicked: boolean;
  isMandatory = true;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userType = params['userType'];
      this.userId = params['userId'];
      this.eventId = params['eventId'];
      console.log(params);
      this.createForm();
      this.feedbackDetails = new Feedback();
      this.getFeedbackInfo(this.eventId, this.userId, this.userType);
    });
    if (this.userType == 1) {
      this.isTypeOne_Users = true;
    } else {
      this.isNonTypeOne_Users = true;
    }
  }
  get f() {
    return this.form.controls;
  }
  ratingComponentClick(clickObj: any): void {
    this.rating = clickObj.rating;
    if (this.rating != null) {
      this.isRatingClicked = true;
    }
    if (this.rating != null && this.rating <= 3) {
      this.isMandatory = false;
      this.isRatingClicked = false;
    } else {
      this.isMandatory = true;
    }
    console.log(clickObj.rating);
  }
  createForm() {
    this.form = this.fb.group({
      gnTypeOneUser: this.fb.group({
        qst1Ans: [],
        qst2Ans: []
      }),
      gnTypeTwoUser: this.fb.group({
        rdQ1: ['', Validators.required]
      })
    });
  }
  getFeedbackInfo(eventId, userId, userType) {
    this.feedbackService
      .getFeedbackDetailsByEventid(
        localStorage.getItem('jwt'),
        eventId,
        userId,
        userType
      )
      .subscribe(
        response => {
          this.feedbackDetails = <Feedback>response;
          console.log('111');
          console.log(this.feedbackDetails);
        },
        err => {
          console.log(err);
        }
      );
  }
  onSubmit() {
    const formmodel = this.form.value;
    this.feedbackDetails.EmployeeId = this.userId;
    this.feedbackDetails.EventId = this.eventId;
    this.feedbackDetails.UserCategoryId = this.userType;
    this.feedbackDetails.RatingId = this.rating;
    this.feedbackDetails.FeedbackOptionId = formmodel.gnTypeTwoUser.rdQ1;
    this.feedbackDetails.Qstn1Ans = formmodel.gnTypeOneUser.qst1Ans;
    this.feedbackDetails.Qstn2Ans = formmodel.gnTypeOneUser.qst2Ans;
    console.log(formmodel);
    console.log(this.feedbackDetails);

    this.feedbackService
      .save(this.feedbackDetails)
      .subscribe(response => {}, err => {});
  }
}
