export type TypeSocketServerEvent = {
  id: string;
  event: 'heartbeat';
  GIT_COMMIT: string;
};

export type TypeSocketClientEvent = {
  id: string;
  event: 'heartbeat';
};
