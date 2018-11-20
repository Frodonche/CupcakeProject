import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cupcake, Base, Glacage, Garniture, Topping } from '../interfaces/cupcake';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: [ './card.component.css' ]
})
export class CardComponent implements OnInit {
  // private property to store cupcake value
  private _cupcake: Cupcake;
  // private property to store delete$ value
  private readonly _delete$: EventEmitter<Cupcake>;

  /**
   * Component constructor
   */
  constructor(private _router: Router) {
    this._cupcake = {} as Cupcake;
    this._delete$ = new EventEmitter<Cupcake>();
  }

  /**
   * Returns private property _cupcake
   */
  get cupcake(): Cupcake {
    return this._cupcake;
  }

  /**
   * Sets private property _cupcake
   */
  @Input()
  set cupcake(cupcake: Cupcake) {
    this._cupcake = cupcake;
  }

  /**
   * Returns private property _delete$
   */
  @Output('deleteCupcake') get delete$(): EventEmitter<Cupcake> {
    return this._delete$;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
  }

  /**
   * Function to emit event to delete current cupcake
   */
  delete(cupcake: Cupcake) {
    this._delete$.emit(cupcake);
  }
}
