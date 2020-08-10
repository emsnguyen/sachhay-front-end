import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-comment-dialog',
  templateUrl: './edit-comment-dialog.component.html',
  styleUrls: ['./edit-comment-dialog.component.scss']
})
export class EditCommentDialogComponent implements OnInit {

  commentForm:FormGroup;

  constructor(private dialogRef: MatDialogRef<EditCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb:FormBuilder
    ) { }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      content:[this.data.content, Validators.compose([Validators.required,Validators.minLength(3)])]
    });
  }

  save() {
    this.dialogRef.close(this.content.value);
  }

  close() {
      this.dialogRef.close();
  }

  get content() { return this.commentForm.get('content'); }
}
