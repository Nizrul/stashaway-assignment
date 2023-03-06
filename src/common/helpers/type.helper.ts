// Based on Stack Overflows's post https://stackoverflow.com/questions/46583883/typescript-pick-properties-with-a-defined-type
export type PickByType<T, Value> = {
  [P in keyof T as T[P] extends Value | undefined ? P : never]: Value;
};
