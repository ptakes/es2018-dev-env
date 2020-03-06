declare module NodeJS {
  interface Global {
    window: Window;
    document: Document;
    localStorage: Storage;
    sessionStorage: Storage;
    jQuery: JQueryStatic;
  }
}
