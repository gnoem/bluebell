import { AppSections } from "config";
import { IDropdownOption, Obj, Writeable } from "types";
export * from "./lists";

/**
 * Turns 1 into '01', 2 into '02', ... 9 into '09'
 * @param num a number between 0 and 9, inclusive
 * @returns the stringified number with a zero placed at the beginning
 */
export const getTwoDigitString = (num: number) => (num < 10) ? `0${num}` : `${num}`;

/**
 * Get a date string in 'YYYY-MM-DD' form
 * @param day a date object
 * @returns date in 'YYYY-MM-DD' form
 */
export const getDateString = (day: Date) => `${day.getFullYear()}-${getTwoDigitString(day.getMonth() + 1)}-${getTwoDigitString(day.getDate())}`;

/**
 * setState callback generator for updating arrays held in React state
 * @param update what function to perform on the array
 * @returns setState callback function
 */
export const newArrayFrom = <T extends unknown>(update: (array: T[]) => (T[] | void)) => (prevArray: T[]): T[] => {
  let arrayToReturn = [...prevArray];
  const returnedValue = update(arrayToReturn); 
  /**
   * update() may simply modify the arrayToReturn (e.g. via push()/splice() etc.) without returning anything, in which case returnedValue will be undefined,
   * or it may return a new array
   */
  return (typeof returnedValue === 'undefined') ? arrayToReturn : returnedValue;
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

/**
 * Constructs an array of objects to pass to a Dropdown component as its dropdownOptions prop
 * @param values array of values for dropdown options
 * @param displays array of displays for dropdown options
 * @returns array of `{ value, display }` objects
 */
export const createDropdownOptions = <T = string>(values: T[], displays: T[] = values): IDropdownOption<T>[] => {
  return values.map((value, i) => ({
    value,
    display: displays[i]
  }));
}

export const getSection = <Name extends keyof AppSections>(name: Name, component: React.FC<AppSections[Name]>): React.FC<AppSections[Name]> => component;