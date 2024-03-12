declare module 'datocms-client' {
  export class SiteClient {
    constructor(token: string);
    items: {
      create: (data: { itemType: string } & Record<string, any>) => Promise<any>;
      all: (data: any) => Promise<any>;
    };
    item: {
      find: (id: string) => Promise<any>;
      update: (id: string, data: Record<string, any>) => Promise<any>;
    };
  }
}
