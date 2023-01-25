import ListItems from './List';

interface List {
  list: ListItems[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: ListItems): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  static instance: FullList = new FullList();
  private constructor(private _list: ListItems[] = []) {}

  get list(): ListItems[] {
    return this._list;
  }

  load(): void {
    const storedList: string | null = localStorage.getItem('list');
    if (typeof storedList !== 'string') return;

    const parsedList: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(storedList);

    parsedList.forEach((itemObj) => {
      const newListItems = new ListItems(
        itemObj._id,
        itemObj._item,
        itemObj._checked
      );
      FullList.instance.addItem(newListItems);
    });
  }
  save(): void {
    localStorage.setItem('list', JSON.stringify(this._list));
  }

  clearList(): void {
    this._list = [];
    this.save();
  }

  addItem(itemObj: ListItems): void {
    this._list.push(itemObj);
    this.save();
  }
  removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }
}
