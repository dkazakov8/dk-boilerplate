/* eslint-disable */
// This file is auto-generated

import * as t from "ts-interface-checker";
// tslint:disable:object-literal-key-quotes
import * as AllImports0 from '../models/system/TypeApiRoute';

export const TypeRequest = t.iface([], {
  "email": "string",
  "latitude": "number",
  "longitude": "number",
  "push_token": t.opt("string"),
  "formatted_address": t.opt(t.union("string", t.lit(null))),
  "city": t.opt(t.union("string", t.lit(null))),
  "state": t.opt(t.union("string", t.lit(null))),
  "country": t.opt(t.union("string", t.lit(null))),
  "postal_code": t.opt(t.union("string", t.lit(null))),
});

export const TypeResponse = t.iface([], {
});

export const TypeError = t.iface([], {
});

const exportedTypeSuite: t.ITypeSuite = {
  TypeRequest,
  TypeResponse,
  ...AllImports0,
};
export default exportedTypeSuite;
