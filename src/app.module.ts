import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { EmployeeSchema } from './schema/employee.schema';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { EmployeeService } from './employee/employee.service';
import { SocketGateway } from './gateway/gateway';
import { GatewayModule } from './gateway/gateway.module';
import { GatewayService } from './gateway/gateway.service';
@Module({
  imports: [
    GatewayModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      dbName: 'test',
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Employee', schema: EmployeeSchema },
    ]),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, EmployeeService],
})
export class AppModule {}
