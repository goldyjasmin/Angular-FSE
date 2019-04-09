import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { FeedbackService } from './feedback.service';
import { AppModule } from '../../app.module';
import { HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { APP_BASE_HREF } from '@angular/common';

describe('FeedbackService', () => {
  let service: FeedbackService;
  let httpMock: HttpTestingController;
  let model: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, HttpClientTestingModule],
      providers: [FeedbackService, { provide: APP_BASE_HREF, useValue: '/' }]
    });

    service = TestBed.get(FeedbackService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: FeedbackService = TestBed.get(FeedbackService);
    expect(service).toBeTruthy();
  });
});
