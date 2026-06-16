declare module 'hls.js' {
  export interface HlsConfig {
    enableWorker?: boolean;
    lowLatencyMode?: boolean;
  }

  export interface ErrorData {
    fatal?: boolean;
  }

  export default class Hls {
    static Events: {
      ERROR: string;
    };

    static isSupported(): boolean;

    constructor(config?: HlsConfig);
    loadSource(url: string): void;
    attachMedia(media: HTMLMediaElement): void;
    destroy(): void;
    on(event: string, handler: (event: string, data: ErrorData) => void): void;
  }
}
