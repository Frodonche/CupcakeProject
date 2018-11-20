import {Base} from './base';
import {Topping} from './topping';
import {Garniture} from './garniture';
import {Glacage} from './glacage';

export interface Cupcake {
    id?: string;
    nom: string;
    composition: Composition
    createur: string;
}

export interface Composition {
    base: Base;
    glacage: Glacage;
    topping: Topping;
    garniture: Garniture;
}
