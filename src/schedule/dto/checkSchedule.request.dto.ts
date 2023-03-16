import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class checkScheduleRequestDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    name: 'scheduleId',
    description: '가져올 계획의 id',
    example: 2,
  })
  public scheduleId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    name: 'scheduleIdx',
    description: '체크하거나 체크해제할 schedule의 idx',
    example: 3,
  })
  public scheduleIdx: number;
}
