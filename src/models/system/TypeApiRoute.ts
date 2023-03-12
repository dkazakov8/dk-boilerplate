export type TypeApiRoute = {
  url: string | ((request: any) => string);
  mock?: any;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: any;
};
