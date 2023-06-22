import * as http from 'http';
import * as https from 'https';

import { WebSocket, WebSocketServer } from 'ws';

import { env } from '../env';

import { errorsNames } from './const/errorsNames';
import { createError } from './utils/system/createError';
import { TypeSocketClientEvent, TypeSocketServerEvent } from './models/TypeSocketEvent';

const parseMessage = (data: string): TypeSocketClientEvent | null => {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error(
      createError(errorsNames.WS_ERROR_DATA, `Wrong data from socket client connection`),
      data
    );
  }

  return null;
};

export function createSocketServer(server: http.Server | https.Server) {
  return;

  const wss = new WebSocketServer({ server, path: '/ws' });

  wss.on('connection', (ws) => {
    ws.on('error', (error) => console.error(error));
    ws.on('message', (data) => {
      if (ws.readyState === WebSocket.OPEN) {
        const clientEvent = parseMessage(data.toString());

        if (clientEvent?.event === 'heartbeat') {
          const serverEvent: TypeSocketServerEvent = {
            id: clientEvent.id,
            event: clientEvent.event,
            GIT_COMMIT: env.GIT_COMMIT,
          };

          ws.send(JSON.stringify(serverEvent));
        }
      }
    });
  });
}
