import { Obj, Writeable } from "types";

/**
 * setState callback generator for updating arrays held in React state
 * @param update what function to perform on the array
 * @returns setState callback function
 */
 export const newArrayFrom = <T extends unknown>(update: (array: T[]) => void) => (prevArray: T[]): T[] => {
  const arrayToReturn = [...prevArray];
  update(arrayToReturn);
  return arrayToReturn;
}

/**
 * setState callback generator for updating objects held in React state
 * @param update what function to perform on the object
 * @returns setState callback function
 */
export const newObjectFrom = <T extends Obj>(update: (obj: Writeable<T>) => void) => (prevObj: T): T => {
  const objectToReturn = {...prevObj}; // needs to be recursive?
  update(objectToReturn);
  return objectToReturn;
}