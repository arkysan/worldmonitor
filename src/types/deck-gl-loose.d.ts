declare module '@deck.gl/core' {
  export type Layer = any;
  export type LayersList = any[];
  export type PickingInfo = any;
}

declare module '@deck.gl/mapbox' {
  export class MapboxOverlay {
    constructor(props?: any);
    setProps(props: any): void;
    finalize(): void;
  }
}

declare module '@deck.gl/layers' {
  export class GeoJsonLayer { constructor(props?: any); }
  export class ScatterplotLayer { constructor(props?: any); }
  export class PathLayer { constructor(props?: any); }
  export class IconLayer { constructor(props?: any); }
  export class TextLayer { constructor(props?: any); }
  export class PolygonLayer { constructor(props?: any); }
  export class ArcLayer { constructor(props?: any); }
}

declare module '@deck.gl/aggregation-layers' {
  export class HeatmapLayer { constructor(props?: any); }
}

declare module '@deck.gl/geo-layers' {
  export class H3HexagonLayer { constructor(props?: any); }
  export class TripsLayer { constructor(props?: any); }
}

declare module '@deck.gl/extensions' {
  export class PathStyleExtension { constructor(props?: any); }
}
