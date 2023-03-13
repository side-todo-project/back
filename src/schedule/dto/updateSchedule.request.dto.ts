import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export type Iroutine = {
  when: string;
  what: string;
};
export class updateScheduleRequestDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    name: 'scheduleId',
    description: '수정할 스케쥴 id',
    example: 23,
  })
  public scheduleId: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    name: 'schedule',
    description: '일정 배열',
    example:
      '[{ "when": "일어나서", "what": "wakeup" }, { "when": "8:00", "what": "breakfast" }]',
  })
  public schedule: Iroutine[];

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
