export function registerExtensions() {
  Array.prototype.update = function<T>(
    predicate: (value: T) => boolean,
    update: (value: T) => void,
  ): Array<T> {
    const indices: number[] = [];

    this.forEach((val: T, index: number) => {
      if (predicate(val))
        indices.push(index);
    });

    const newArr = [...this];

    for (let index = 0; index < indices.length; index++) {
      const element = newArr[index];
      update(element);
      newArr[index] = element;
    }

    return newArr;
  }
}