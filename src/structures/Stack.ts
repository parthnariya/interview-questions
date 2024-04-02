export default class Stack<T> {
  private stack: T[] = [];

  public constructor(arr: T[]) {
    if (arr.length > 0) {
      this.stack.push(...arr);
    }
  }

  public push(item: T) {
    return this.stack.push(item);
  }

  public pop() {
    return this.stack.pop();
  }

  public isEmpty() {
    return this.stack.length === 0;
  }

  public length() {
    return this.stack.length;
  }

  public has(item: T) {
    return this.stack.includes(item);
  }
}
