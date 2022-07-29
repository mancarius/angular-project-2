import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Route } from '@enum/route.enum';
import { searchRoutes } from 'src/app/features/fruit-search/search-routing.module';
import { SearchComponent } from 'src/app/features/fruit-search/search.component';
import { AppComponent } from 'src/app/app.component';
import { HttpAbortService } from '../services/http-abort.service';

import { ManageHttpInterceptor } from './manage-http.interceptor';

describe('ManageInterceptor', () => {
  let router: Router;
  let HttpAbortServiceMock: jasmine.SpyObj<HttpAbortService>;

  beforeEach(() => {
    HttpAbortServiceMock = jasmine.createSpyObj('HttpAbortService', ['abortPendingRequests']);
    HttpAbortServiceMock.abortPendingRequests.and.stub();

    TestBed.configureTestingModule({
      providers: [
        ManageHttpInterceptor,
        { provide: HttpAbortService, useValue: HttpAbortServiceMock }
      ],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(searchRoutes)],
      declarations: [SearchComponent, AppComponent]
    }).compileComponents();

    router = TestBed.inject(Router);
    router.initialNavigation();
  });

  it('should be created', () => {
    const interceptor: ManageHttpInterceptor = TestBed.inject(ManageHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should call #httpAbortService.abortPendingRequests on router navigation', async () => {
    const interceptor: ManageHttpInterceptor = TestBed.inject(ManageHttpInterceptor);

    await router.navigateByUrl(Route.search);

    expect(HttpAbortServiceMock.abortPendingRequests).toHaveBeenCalledTimes(1);
  })
});
