import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export type ISchedule = {
  when: string;
  what: string;
};

export class scheduleResponseDto {
  @ApiProperty({
    name: 'id',
    description: '스케줄 id',
    example: 1,
  })
  public id: number;

  @ApiProperty({
    name: 'scheduleDate',
    description: '계획 날짜',
    example: '2022-03-01',
  })
  public scheduleDate: Date;

  @ApiProperty({
    name: 'schedule',
    description: '일정 배열',
    example:
      '[{ "when": "일어나서", "what": "wakeup" }, { "when": "8:00", "what": "breakfast" }]',
  })
  public schedule: ISchedule[];

  @ApiProperty({
    name: 'isPrivate',
    description: '공개 여부',
    example: true,
  })
  public isPrivate: boolean;

  @ApiProperty({
    name: 'likeCount',
    description: '일정의 좋아요 개수',
    example: 31,
  })
  public likeCount: number;

  @ApiProperty({
    name: 'check',
    description: '일정별 성공 여부',
    example: ['false', 'true', 'true'],
  })
  public check: boolean[];

  @ApiProperty({
    name: 'tags',
    description: '일정에 관한 태그',
    example: '["대학생", "아침형"]',
  })
  public tags: string[];

  @ApiProperty({
    name: 'ScheduleOwnerId',
    description: '일정 소유자 userId',
    example: 32,
  })
  public ScheduleOwnerId: number;
}
