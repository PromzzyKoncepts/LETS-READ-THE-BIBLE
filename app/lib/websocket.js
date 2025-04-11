import { Server } from 'socket.io';

export default function configureSocketServer(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  let comments = [];

  io.on('connection', (socket) => {
    console.log('New client connected');
    
    // Send existing comments to new client
    socket.emit('init_comments', comments);
    
    // Handle new comments
    socket.on('new_comment', (comment) => {
      const newComment = {
        ...comment,
        id: Date.now(),
        timestamp: new Date().toISOString()
      };
      comments.push(newComment);
      io.emit('add_comment', newComment);
    });
    
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
}