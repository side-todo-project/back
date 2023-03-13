import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class getScheduleRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'scheduleDate',
    description: '가져올 계획의 날짜',
    example: '2022-03-01',
  })
  public scheduleDate: Date;
}
