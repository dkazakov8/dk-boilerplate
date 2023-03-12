import { TypeApiRoute } from '../models/system/TypeApiRoute';

type TypeRequest = {
  email: string;
  latitude: number;
  longitude: number;

  push_token?: string;
  formatted_address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  postal_code?: string | null;
};

type TypeResponse = {};

type TypeError = {};

export const addAddressWaitlist: TypeApiRoute & {
  error: TypeError;
  request: TypeRequest;
  response: TypeResponse;
} = {
  url: `/api/app/v2/addresses/waitlist`,
  method: 'POST',
  error: {} as TypeError,
  request: {} as TypeRequest,
  response: {} as TypeResponse,
};
