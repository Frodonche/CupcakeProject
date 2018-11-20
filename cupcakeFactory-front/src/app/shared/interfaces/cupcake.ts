export interface Cupcake {
  id?: string;
  nom: string;
  composition: Composition;
  createur: string;
}

export interface Composition {
  pate?: Pate;
  glacage?: Glacage;
  topping?: Topping;
  garniture?: Garniture;
}

export interface Pate {
  id?: string;
  label: string;
  src: string;
}

export interface Glacage {
  id?: string;
  label: string;
  src: string;
}

export interface Topping {
  id?: string;
  label: string;
  src: string;
}

export interface Garniture {
  id?: string;
  label: string;
  src: string;
}

