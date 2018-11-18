import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Cupcake } from '../interfaces/cupcake';

@Component({
  selector: 'nwt-add-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: [ './dialog.component.css' ]
})
export class DialogComponent implements OnInit {

  /**
   * Component constructor
   */
  constructor(private _dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) private _cupcake: Cupcake) {
  }

  /**
   * Returns cupcake passed in dialog open
   */
  get cupcake(): Cupcake {
    return this._cupcake;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
  }

  /**
   * Function to cancel the process and close the modal
   */
  onCancel() {
    this._dialogRef.close();
  }

  /**
   * Function to close the modal and send cupcake to parent
   */
  onSave(cupcake: Cupcake) {
    this._dialogRef.close(cupcake);
  }
}
