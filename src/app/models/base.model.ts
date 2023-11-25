export class BaseModel {
  constructor(data: any) {
    Object.keys(data || {}).forEach((k: string) => (this as any)[k] = data[k]);
  }
}