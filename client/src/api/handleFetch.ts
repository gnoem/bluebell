import { Obj } from "types";
import { hostname } from "./config";

interface IArguments<T = Obj> {
  GET: undefined;
  POST: T;
  PUT: T;
  DELETE: T;
}

const handleFetch = <Method extends keyof IArguments>(method: Method) => {
  return async <ResultType, InputType = void>(
    ...args: InputType extends IArguments<InputType>['GET'] ? [
      path: string
    ] : [
      path: string,
      data: InputType
    ]
  ): Promise<ResultType> => {
    const [path, data] = [...args];
    const response = await fetch(`${hostname}${path}/`, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: data ? JSON.stringify(data) : null
    });
    const body = await response.json();
    if (response.ok) {
      return body;
    }
    console.error(`${method} request to ${path} failed!!`);
    throw new Error(body);
  }
}

export const get = handleFetch('GET');
export const post = handleFetch('POST');
export const put = handleFetch('PUT');
export const del = handleFetch('DELETE');