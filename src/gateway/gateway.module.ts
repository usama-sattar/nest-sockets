import { Module } from '@nestjs/common';
import { SocketGateway } from './gateway';
import { GatewayService } from './gateway.service';
import { UserController } from 'src/user/user.controller';

@Module({
  providers: [SocketGateway, GatewayService],
})
export class GatewayModule {}
