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

export enum ItemTypeFilter {
  All = 'All groceries',
  Vegetables = 'Vegetables',
  Fruit = 'Fruit'
}

export const toType = (filter: ItemTypeFilter.Vegetables | ItemTypeFilter.Fruit): ItemType => {
  switch (filter) {
    case ItemTypeFilter.Vegetables: {
      return ItemType.Vegetable
    }
    case ItemTypeFilter.Fruit: {
      return ItemType.Fruit;
    }
    default: {
      throw new Error('Unexpected value');
    }
  }
}

export default Item;
