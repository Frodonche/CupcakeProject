import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { filter, flatMap } from 'rxjs/operators';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { Cupcake } from '../shared/interfaces/cupcake';
import { CupcakesService } from '../shared/services/cupcakes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'nwt-cupcakes',
  templateUrl: './cupcakes.component.html',
  styleUrls: [ './cupcakes.component.css' ]
})
export class CupcakesComponent implements OnInit {

  // private property to store cupcakes value
  private _cupcakes: Cupcake[];
  // private property to store dialogStatus value
  private _dialogStatus: string;
  // private property to store dialog reference
  private _cupcakesDialog: MatDialogRef<DialogComponent>;
  // private property to store view value
  private _view: string;

  /**
   * Component constructor
   */
  constructor(private _router: Router, private _cupcakesService: CupcakesService, private _dialog: MatDialog) {
    this._cupcakes = [];
    this._dialogStatus = 'inactive';
    this._view = 'card';
  }

  /**
   * Returns private property _cupcakes
   */
  get cupcakes(): Cupcake[] {
    return this._cupcakes;
  }

  /**
   * Returns private property _dialogStatus
   */
  get dialogStatus(): string {
    return this._dialogStatus;
  }

  /**
   * Returns private property _view
   */
  get view(): string {
    return this._view;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._cupcakesService
      .fetch().subscribe((cupcakes: Cupcakes[]) => this._cupcakes = cupcakes);
  }

  /**
   * Function to delete one person
   */
  delete(cupcake: Cupcake) {
    this._cupcakesService
      .delete(cupcake.id)
      .subscribe(_ => this._cupcakes = this._cupcakes.filter(__ => __.id !== _));
  }

  /**
   * Function to display modal
   */
  showDialog() {
    // set dialog status
    this._dialogStatus = 'active';

    // open modal
    this._cupcakesDialog = this._dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._cupcakesDialog.afterClosed()
      .pipe(
        filter(_ => !!_),
        flatMap(_ => this._add(_))
      )
      .subscribe(
        (cupcakes: Cupcake[]) => this._cupcakes = cupcakes,
        _ => this._dialogStatus = 'inactive',
        () => this._dialogStatus = 'inactive'
      );
  }

  /**
   * Function to switch view
   */
  switchView() {
    this._view = (this._view === 'card') ? 'list' : 'card';
  }

  /**
   * Function to navigate to current cupcake
   */
  navigate(cupcake: Cupcake) {
    this._router.navigate([ '/cupcake', cupcake.id ]);
  }

  /**
   * Add new cupcake and fetch all cupcakes to refresh the list
   */
  private _add(cupcake: Cupcake): Observable<Cupcake[]> {
    return this._cupcakesService
      .create(cupcake)
      .pipe(
        flatMap(_ => this._cupcakesService.fetch())
      );
  }
}
