import { Component, OnInit } from '@angular/core';
import { defaultIfEmpty, filter, flatMap, tap } from 'rxjs/operators';
import { Cupcake } from '../shared/interfaces/cupcake';
import { CupcakesService } from '../shared/services/cupcakes.service';
import { merge } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nwt-cupcake',
  templateUrl: './cupcake.component.html',
  styleUrls: [ './cupcake.component.css' ]
})
export class CupcakeComponent implements OnInit {

  private _cupcake: Cupcake;

  /**
   * Component constructor
   */
  constructor(private _peopleService: CupcakesService, private _route: ActivatedRoute) {
    this._cupcake = {} as Cupcake;
  }

  /**
   * Returns private property _cupcake
   */
  get cupcake(): Cupcake {
    return this._cupcake;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    merge(
      this._route.params.pipe(
        filter(params => !!params['id']),
        flatMap(params => this._cupcakesService.fetchOne(params['id'])),
      ),
      this._route.params.pipe(
        filter(params => !params['id']),
        flatMap(_ => this._cupcakesService.fetchRandom()),
      )
    )
      .subscribe((cupcake: any) => this._cupcake = cupcake);
  }

  /**
   * Returns random people
   */
  random() {
    this._cupcakeService
      .fetchRandom()
      .subscribe((cupcake: Cupcake) => this._cupcake = cupcake);
  }
}
