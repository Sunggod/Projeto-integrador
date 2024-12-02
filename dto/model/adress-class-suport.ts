import { Adress } from "../../interface/adress.interface";

export class AdressClass implements Adress {
    street: string ='';
    city: string = '';
    state: string = '';
    postalCode: string = '';
    zip: string = '';
}
  