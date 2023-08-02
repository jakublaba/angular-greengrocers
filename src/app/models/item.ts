interface Item {
  id: string;
  name: string;
  type: ItemType;
  price: number;
}

export enum ItemType {
  Vegetable = 'vegetable',
  Fruit = 'fruit'
}

export default Item;
