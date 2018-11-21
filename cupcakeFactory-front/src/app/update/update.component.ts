import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { filter, flatMap, map } from 'rxjs/operators';
import { Cupcake } from '../shared/interfaces/cupcake';
import { CupcakesService } from '../shared/services/cupcakes.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: [ './update.component.css' ]
})
export class UpdateComponent implements OnInit {
  // private property to store dialog reference
  private _cupcakesDialog: MatDialogRef<DialogComponent>;

  /**
   * Component constructor
   */
  constructor(private _route: ActivatedRoute, private _router: Router, private _cupcakesService: CupcakesService, private _dialog: MatDialog) {
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._route.params
      .pipe(
        map((params: any) => params.id),
        flatMap((id: string) => this._cupcakesService.fetchOne(id))
      )
      .subscribe((cupcake: Cupcake) => {
        this._cupcakesDialog = this._dialog.open(DialogComponent, {
          minWidth: '600px',
          disableClose: true,
          data: cupcake
        });

        // subscribe to afterClosed observable to set dialog status and do process
        this._cupcakesDialog.afterClosed()
          .pipe(
            filter(_ => !!_),
            flatMap(_ => this._cupcakesService.update(_))
          )
          .subscribe(null, null, () => this._router.navigate([ '/cupcakes' ]));
      });
  }
}
