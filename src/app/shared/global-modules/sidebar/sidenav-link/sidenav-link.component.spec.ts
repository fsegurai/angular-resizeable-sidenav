import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';

import {SidenavLinkComponent} from './sidenav-link.component';

describe('SidenavLinkComponent', () => {
  let component: SidenavLinkComponent;
  let fixture: ComponentFixture<SidenavLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavLinkComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: 'testId'}) // Mock any necessary ActivatedRoute properties here.
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SidenavLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
