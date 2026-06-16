import 'maplibre-gl';

declare module 'maplibre-gl' {
  export type FilterSpecification = any[];
  export type RasterTileSource = RasterSource;
  export type StyleSpecification = any;

  interface MapOptions {
    canvasContextAttributes?: WebGLContextAttributes;
  }

  interface Map {
    style?: unknown;
  }

  function addProtocol(
    name: string,
    protocol: (request: { url: string }, callback: (error?: Error | null, data?: unknown) => void) => unknown,
  ): void;
}
