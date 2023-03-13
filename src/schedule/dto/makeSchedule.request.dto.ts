import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export type ISchedule = {
  when: string;
  what: string;
};

export class makeScheduleRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'scheduleDate',
    description: '계획 날짜',
    example: '2022-03-01',
  })
  public scheduleDate: Date;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    name: 'schedule',
    description: '일정 배열',
    example:
      '[{ "when": "일어나서", "what": "wakeup" }, { "when": "8:00", "what": "breakfast" }]',
  })
  public schedule: ISchedule[];

  @IsBoolean()
  @ApiProperty({
    name: 'isPrivate',
    description: '공개 여부',
    example: true,
  })
  public isPrivate: boolean;

  @IsArray()
  @ApiProperty({
    name: 'tags',
    description: '일정에 관한 태그',
    example: '["대학생", "아침형"]',
  })
  public tags: string[];
}
