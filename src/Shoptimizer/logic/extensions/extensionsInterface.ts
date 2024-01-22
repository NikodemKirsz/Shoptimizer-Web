interface Array<T> {
  update(
    predicate: (value: T) => boolean,
    update: (value: T) => void,
  ): Array<T>;
}