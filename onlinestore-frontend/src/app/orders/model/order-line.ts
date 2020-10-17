import {Product} from '../../products/components/model/product';

export class OrderLine {
  id: number;
  quantity: number;
  price: number;
  productModel: Product;
}
