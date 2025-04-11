import { NextResponse } from 'next/server';
import { Server } from 'socket.io';
import configureSocketServer from '@/app/lib/socket-server';

// This will be initialized when the server starts
let io;

export async function GET() {
  if (!io) {
    return NextResponse.json(
      { error: 'Socket.io server not initialized' },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: 'Socket.io server is running', clients: io.engine.clientsCount },
    { status: 200 }
  );
}

// Initialize Socket.io with the Next.js server
export function registerSocketServer(server) {
  if (!io) {
    io = configureSocketServer(server);
    console.log('Socket.io server initialized');
  }
}