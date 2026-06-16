export class EffectComposer {
  passes: unknown[] = [];

  constructor() {}

  addPass(pass: unknown) {
    this.passes.push(pass);
  }

  render() {}

  setSize() {}

  dispose() {}
}

export class RenderPass {
  constructor() {}
}
