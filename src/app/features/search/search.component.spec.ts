import { StoreModule } from "@ngrx/store";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SearchComponent } from "./search.component";
import { RouterTestingModule } from "@angular/router/testing";
import { searchReducer } from "./store/reducers/search.reducers";
import { MockStore, provideMockStore } from "@ngrx/store/testing";

describe("SearchComponent", () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({ search: searchReducer }),
      ],
      providers: [provideMockStore({ initialState: {} })],
    }).compileComponents();
  
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
