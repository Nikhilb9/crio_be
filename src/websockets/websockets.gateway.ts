import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { RedisService } from 'nestjs-redis';
import { Server, Socket } from 'socket.io';
import { Inject } from '@nestjs/common';
import { Redis } from 'ioredis';

@WebSocketGateway({ cors: true })
export class WebsocketsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private redisClient: Redis;

  constructor(
    @Inject(RedisService) private readonly redisService: RedisService,
  ) {
    this.redisClient = this.redisService.getClient();
  }

  async handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  async handleDisconnect(client: Socket) {
    const userId = await this.redisClient.get(client.id);
    if (userId) {
      await this.redisClient.del(client.id); // Remove from Redis
      await this.redisClient.lrem('activeUsers', 0, userId); // Remove from the active users list
      this.updateActiveUsers();
    }
  }

  @SubscribeMessage('userConnected')
  async handleUserConnected(client: Socket, user: any) {
    await this.redisClient.set(client.id, user.username); // Cache user with socket ID
    await this.redisClient.rpush('activeUsers', user.username); // Add user to Redis list
    this.updateActiveUsers(); // Notify all clients of the new active users list
  }

  @SubscribeMessage('broadcastMessage')
  handleBroadcastMessage(client: Socket, message: string) {
    this.server.emit('broadcast', message);
  }

  async updateActiveUsers() {
    const activeUsers = await this.redisClient.lrange('activeUsers', 0, -1);

    this.server.emit('activeUsers', activeUsers); // Send the list of active users to all clients
  }
}
