export interface Cupcake {
    id?: string;
    nom: string;
    composition: Composition;
    custom: boolean;
}

export interface Composition {
    pate: string;
    garniture: string;
    glacage: string;
    topping: string;
}
