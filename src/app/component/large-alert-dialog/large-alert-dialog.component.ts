import { Component, Inject, NgZone, OnDestroy, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-large-alert-dialog',
  templateUrl: './large-alert-dialog.component.html',
  styleUrls: ['./large-alert-dialog.component.css']
})
export class LargeAlertDialogComponent implements OnDestroy {

  constructor(
    public dialogRef: MatDialogRef<LargeAlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string, },
    private ngZone : NgZone, 
  ) {}


  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  cancel(): void {
    this.ngZone.run(() => {
      this.dialogRef.close();
    });   
  }
}