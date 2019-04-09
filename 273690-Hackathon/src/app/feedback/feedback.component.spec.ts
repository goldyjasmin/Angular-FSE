import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FeedbackComponent } from './feedback.component';
import { RatingComponent } from '../shared/_rating/rating.component';
import { FeedbackService } from './service/feedback.service';

describe('FeedbackComponent', () => {
  let component: FeedbackComponent;
  let fixture: ComponentFixture<FeedbackComponent>;
  let feedbackService: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'feedback/:userType/:userId/:eventId',
            component: FeedbackComponent
          }
        ])
      ],
      declarations: [FeedbackComponent, RatingComponent],
      providers: [FeedbackService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackComponent);
    component = fixture.componentInstance;
    feedbackService = TestBed.get(FeedbackService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    const userId = 123;
    component.userId = userId;
    spyOn(feedbackService, 'save').and.callThrough();
    component.onSubmit();

    expect(component.feedbackDetails.EmployeeId).toBe(userId);
  });
});
