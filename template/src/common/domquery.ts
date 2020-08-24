/**
 * 精简dom节点查询
 */
class Query {
  private list: NodeList | Element[];
  constructor(list: NodeList | Element[]) {
    this.list = list;
  }
  each(callback) {
    this.forEach(callback);
  }
  forEach(callback) {
    this.list.forEach((ele: Element, index) => callback(ele, index));
  }
  get length() {
    return this.list.length;
  }
  find(selector: string) {
    let list: Element[] = [];
    this.each((ele: Element, i) => {
      let l = ele.querySelectorAll(selector);
      l.forEach((v) => list.push(v));
    });
    return new Query(list);
  }
}

export default function query(...args): Query {
  return new Query(document.querySelectorAll.bind(document)(...args));
}
