export class ConvexClient {
  constructor() {
    throw new Error('Convex browser client runtime is unavailable in this local dependency tree');
  }
}

export class BaseConvexClient extends ConvexClient {}
export class ConvexHttpClient extends ConvexClient {}
