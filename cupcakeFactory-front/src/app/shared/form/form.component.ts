import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cupcake, Garniture, Glacage, Base, Topping } from '../interfaces/cupcake';
import { CupcakesService } from '../services/cupcakes.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: [ './form.component.css' ]
})
export class FormComponent implements OnInit, OnChanges {
  // private property to store update mode flag
  private _isUpdateMode: boolean;
  // private property to store model value
  private _model: Cupcake;

  private _bases: Base[];
  private _glacages: Glacage[];
  private _toppings: Topping[];
  private _garnitures: Garniture[];
  // private property to store cancel$ value
  private readonly _cancel$: EventEmitter<void>;
  // private property to store submit$ value
  private readonly _submit$: EventEmitter<Cupcake>;
  // private property to store form value
  private readonly _form: FormGroup;

  /**
   * Component constructor
   */
  constructor( private _cupcakesService: CupcakesService) {
    this._submit$ = new EventEmitter<Cupcake>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this._buildForm();
    this._bases = [];
    this._glacages = [];
    this._toppings = [];
    this._garnitures = [];
  }

  /**
   * Returns private property _bases
   */
  get bases(): Base[] {
    return this._bases;
  }

  /**
   * Returns private property _glacages
   */
  get glacages(): Glacage[] {
    return this._glacages;
  }

  /**
   * Returns private property _toppings
   */
  get toppings(): Topping[] {
    return this._toppings;
  }

  /**
   * Returns private property _garnitures
   */
  get garnitures(): Garniture[] {
    return this._garnitures;
  }


  /**
   * Sets private property _model
   */
  @Input()
  set model(model: Cupcake) {
    this._model = model;
  }

  /**
   * Returns private property _model
   */
  get model(): Cupcake {
    return this._model;
  }

  /**
   * Returns private property _form
   */
  get form(): FormGroup {
    return this._form;
  }

  /**
   * Returns private property _isUpdateMode
   */
  get isUpdateMode(): boolean {
    return this._isUpdateMode;
  }

  /**
   * Returns private property _cancel$
   */
  @Output('cancel')
  get cancel$(): EventEmitter<void> {
    return this._cancel$;
  }

  /**
   * Returns private property _submit$
   */
  @Output('submit')
  get submit$(): EventEmitter<Cupcake> {
    return this._submit$;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._cupcakesService.fetchBases().subscribe((bases: Base[]) => this._bases = bases );
    this._cupcakesService.fetchGlacages().subscribe((glacages: Glacage[]) => this._glacages = glacages);
    this._cupcakesService.fetchToppings().subscribe((toppings: Topping[]) => this._toppings = toppings);
    this._cupcakesService.fetchGarnitures().subscribe((garnitures: Garniture[]) => this._garnitures = garnitures);
  }

  /**
   * Function to handle component update
   */
  ngOnChanges(record) {
    if (record.model && record.model.currentValue) {
      console.log('EXISTE');
      this._model = record.model.currentValue;
      console.log(this._model);
      this._isUpdateMode = true;
      this._form.patchValue(this._model);
    } else {
      console.log('EXISTE PAS');
      this._model = {
        nom: '',
        composition: {
          base: {
            label: 'Base',
            src: '../../../assets/res/Bases/base.png'
          },
          glacage: {
            label: 'Base',
            src: '../../../assets/res/Glacages/base.png'
          },
          topping: {
            label: 'Base',
            src: '../../../assets/res/Topping/base.png'
          },
          garniture: {
            label: 'Base',
            src: '../../../assets/res/Garnitures/base.png'
          }
        },
        createur: ''
      };
      this._isUpdateMode = false;
    }
  }

  /**
   * Function to emit event to cancel process
   */
  cancel() {
    this._cancel$.emit();
  }

  /**
   * Function to emit event to submit form and cupcake
   */
  submit(cupcake: Cupcake) {
    this._submit$.emit(cupcake);
  }

  /**
   * Function to build our form
   */
  private _buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl('0'),
      nom: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      createur: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ]))
    });
  }
}
