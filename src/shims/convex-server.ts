// @ts-nocheck
const functionName = Symbol.for('functionName');

function createApi(pathParts = []) {
  return new Proxy({}, {
    get(_, prop) {
      if (typeof prop === 'string') {
        return createApi([...pathParts, prop]);
      }
      if (prop === functionName) {
        return pathParts.join('/');
      }
      if (prop === Symbol.toStringTag) {
        return 'FunctionReference';
      }
      return undefined;
    },
  });
}

export const anyApi = createApi();
export const componentsGeneric = () => createApi(['components']);
export const filterApi = (api) => api;
export const getFunctionName = (reference) => reference?.[functionName] ?? String(reference);
export const makeFunctionReference = (name) => ({ [functionName]: name });
export const createFunctionHandle = (name) => name;
export const currentSystemUdfInComponent = undefined;
export const defineApp = (app) => app;
export const defineComponent = (component) => component;
