import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Cupcake, Garniture, Glacage, Pate, Topping} from '../interfaces/cupcake';
import {CupcakesService} from "../services/cupcakes.service";

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

  private _pates: Pate[];
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
  }

  /**
   * Returns private property _pates
   */
  get pates(): Pate[] {
    return this._pates;
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
    this._cupcakesService.fetchPates().subscribe((pates: Pate[]) => this._pates = pates);
    this._cupcakesService.fetchGlacages().subscribe((glacages: Glacage[]) => this._glacages = glacages);
    this._cupcakesService.fetchToppings().subscribe((toppings: Topping[]) => this._toppings = toppings);
    this._cupcakesService.fetchPates().subscribe((garnitures: Garniture[]) => this._garnitures = garnitures);
  }

  /**
   * Function to handle component update
   */
  ngOnChanges(record) {
    if (record.model && record.model.currentValue && record.model.currentValue.address) {
      this._model = record.model.currentValue;
      this._isUpdateMode = true;
      this._form.patchValue(this._model);
    } else {
      this._model = {
        nom: '',
        composition: {
          pate: {
            label: '',
            src: ''
          },
          glacage: {
            label: '',
            src: ''
          },
          topping: {
            label: '',
            src: ''
          },
          garniture: {
            label: '',
            src: ''
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
      name: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      composition: new FormGroup({
        pate: new FormGroup({
          label: new FormControl(''),
          src: new FormControl('')
        }),
        glacage: new FormGroup({
          label: new FormControl(''),
          src: new FormControl('')
        }),
        topping: new FormGroup({
          label: new FormControl(''),
          src: new FormControl('')
        }),
        garniture: new FormGroup({
          label: new FormControl(''),
          src: new FormControl('')
        }),
      }),
      createur: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ]))
    });
  }
}
