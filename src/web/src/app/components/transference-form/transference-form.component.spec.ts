import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransferenceFormComponent } from './transference-form.component';

describe('TransferenceFormComponent', () => {
  let component: TransferenceFormComponent;
  let fixture: ComponentFixture<TransferenceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferenceFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransferenceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
