import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-rating-dialog',
  templateUrl: './edit-rating-dialog.component.html',
  styleUrls: ['./edit-rating-dialog.component.scss']
})
export class EditRatingDialogComponent implements OnInit {
  stars: number[] = [1, 2, 3, 4, 5];

  @Input()
  rating = 0;

  constructor(private dialogRef: MatDialogRef<EditRatingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
    ) { }

  ngOnInit(): void {
    this.rating = this.data.rating;
  }

  countStar(star) {
    this.rating = star;
    console.log('Value of star', star);
  }

  save() {
    this.dialogRef.close(this.rating);
  }

  close() {
      this.dialogRef.close();
  }

}
