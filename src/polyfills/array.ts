// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Array<T> {
  myMap: <U>(callBack: (item: T, index: number, arr: this) => U) => U[];
  myFilter: (callBack: (item: T, index: number, arr: this) => boolean) => T[];
  myReduce: <U>(
    callbackfn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => U,
    initialValue?: U
  ) => U;
}

// eslint-disable-next-line @typescript-eslint/ban-types
Array.prototype.myMap = function (callBack: Function) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callBack(this[i], i, this));
  }
  return result;
};

console.log([1, 2, 3].myMap((item) => item + item));

// eslint-disable-next-line @typescript-eslint/ban-types
Array.prototype.myFilter = function (callBack: Function) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callBack(this[i], i, this)) result.push(this[i]);
  }
  return result;
};
console.log([1, 2, 3].myFilter((item) => item < 3));

Array.prototype.myReduce = function (
  // eslint-disable-next-line @typescript-eslint/ban-types
  callBack: Function,
  initialValue: unknown
) {
  let result = initialValue ? initialValue : this[0];
  for (let i = initialValue ? 0 : 1; i < this.length; i++) {
    result = callBack(result, this[i], i, this);
  }
  return result;
};
