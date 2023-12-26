import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class UpdateSocketIdDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsString()
  @IsNotEmpty()
  readonly socketId: string;
}
