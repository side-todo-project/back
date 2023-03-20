import { ApiProperty } from '@nestjs/swagger';

export class UserInfoResponseDto {
  @ApiProperty({
    name: 'nickname',
    description: '별명',
  })
  public nickname: string;

  @ApiProperty({
    name: 'introduction',
    description: '간단한 소개',
  })
  public introduction: string;

  @ApiProperty({
    name: 'mosttags',
    description: '태그 순위 상위 3개',
  })
  public mosttags: [string];

  @ApiProperty({
    name: 'schedcnt',
    description: '총 일정 수',
  })
  public schedcnt: number;

  @ApiProperty({
    name: 'schedcomplete',
    description: '완료된 일정 수',
  })
  public schedcomplete: number;

  @ApiProperty({
    name: '',
    description: '',
  })
  public reserved?: number;
}
