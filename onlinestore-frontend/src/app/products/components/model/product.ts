import {Manufacturer} from '../../../manufacturer/components/model/manufacturer';
import {Category} from '../../../categories/model/category';
import {Observable} from 'rxjs';

export class Product {
  id: number;
  name: string;
  description: string;
  thumbnail: Observable<any>;
  price: number;
  category: Category;
  manufacturer: Manufacturer;

}
