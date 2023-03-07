import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SetNicknameRequestDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  public nickname: string;
}
