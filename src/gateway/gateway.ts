import { OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Model } from 'mongoose';
import { IUser } from 'src/interface/user.interface';
import { GatewayService } from './gateway.service';

@WebSocketGateway()
export class SocketGateway implements OnModuleInit {
  constructor(private readonly gatewayService: GatewayService) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id, 'Connected');
    });
  }

  @SubscribeMessage('sendUserId')
  async onSendUserId(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: any,
  ) {
    const { userId } = body;
    const socketId = client.id;
    const updatedUser = await this.gatewayService.updateSocket({
      userId,
      socketId,
    });
    this.server.emit('socketIdUpdatedResponse', updatedUser);
  }

  @SubscribeMessage('newEmployee')
  async onNewMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: any,
  ) {
    console.log('🚀 ~ file: gateway.ts:41 ~ SocketGateway ~ body:', body);
    const { username, email } = body;
    const user = await this.gatewayService.getUserBySocketId(client.id);
    if (!user) {
      this.server.emit('createdEmployeeResponse', {
        message: 'something went wrong',
        success: false,
      });
    }
    const createdBy = user._id;
    const createdEmployee = await this.gatewayService.createEmployee({
      username,
      email,
      createdBy,
    });
    this.server.emit('createdEmployeeResponse', createdEmployee);
  }
}
