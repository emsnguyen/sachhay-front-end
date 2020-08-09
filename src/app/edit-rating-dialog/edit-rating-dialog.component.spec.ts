import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRatingDialogComponent } from './edit-rating-dialog.component';

describe('EditRatingDialogComponent', () => {
  let component: EditRatingDialogComponent;
  let fixture: ComponentFixture<EditRatingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRatingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRatingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
