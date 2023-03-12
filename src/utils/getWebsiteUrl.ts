import { TypeGlobals } from 'models';

export function getWebsiteUrl(globals: TypeGlobals) {
  const { req } = globals;

  const protocol = !req ? location.protocol.replace(':', '') : req.protocol?.replace(':', '');
  const hostname = !req ? location.host.replace('/', '') : req.get('host')?.replace('/', '');

  if (protocol && hostname) return `${protocol}://${hostname}`;

  return null;
}
