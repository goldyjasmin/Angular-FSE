import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { SettingsService } from './settings.service';
import { AppModule } from '../../app.module';
import { HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { APP_BASE_HREF } from '@angular/common';

describe('FeedbackService', () => {
  let service: SettingsService;
  let httpMock: HttpTestingController;
  let model: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, HttpClientTestingModule],
      providers: [SettingsService, { provide: APP_BASE_HREF, useValue: '/' }]
    });

    service = TestBed.get(SettingsService);
    httpMock = TestBed.get(HttpTestingController);
  });
  it('should be created', () => {
    const service: SettingsService = TestBed.get(SettingsService);
    expect(service).toBeTruthy();
  });
});
