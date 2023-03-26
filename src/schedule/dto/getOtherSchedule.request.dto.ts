import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class getOtherScheduleRequestDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    name: 'scheduleId',
    description: '가져올 계획의 id',
    example: 2,
  })
  public scheduleId: number;
}
