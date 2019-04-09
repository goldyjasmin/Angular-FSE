import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { AppModule } from '../../app.module';
import { HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { APP_BASE_HREF } from '@angular/common';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, HttpClientTestingModule],
      providers: [DashboardService, { provide: APP_BASE_HREF, useValue: '/' }]
    });

    service = TestBed.get(DashboardService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should get event names', () => {
    const token = '123';
    service.getEventNames(token, 273690).subscribe((events: any) => {
      expect(events.length).toBe(1);
    });

    const uri = environment.apiUri + 'events/eventnames/273690';
    const request = httpMock.expectOne((req: HttpRequest<any>) => {
      if (req.url !== uri) {
        return false;
      } else {
        return true;
      }
    });

    request.flush([{ eventId: 'EVENT1', eventName: 'TestEventname' }]);
  });
});
