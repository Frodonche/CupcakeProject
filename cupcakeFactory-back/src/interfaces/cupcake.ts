export interface Cupcake {
    id?: string;
    nom: string;
    composition: Composition;
    custom: boolean;
    photo?: string;
}

export interface Composition {
    pate: string;
    garniture: string;
    glacage: string;
}
