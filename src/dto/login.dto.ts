import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  password: string;
}
