import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

// 그러나 먼저(TypeScript를 사용하는 경우) DTO (Data Transfer Object) 스키마를 결정해야 합니다 .
// DTO는 데이터가 네트워크를 통해 전송되는 방법을 정의하는 개체입니다.
// TypeScript 인터페이스나 간단한 클래스를 사용하여 DTO 스키마를 결정할 수 있습니다.
// 흥미롭게도 여기서 클래스를 사용하는 것이 좋습니다.
// 왜? 클래스는 JavaScript ES6 표준의 일부이므로 컴파일된 JavaScript에서 실제 엔터티로 보존됩니다.
// 반면 TypeScript 인터페이스는 변환 중에 제거되기 때문에 Nest는 런타임에 이를 참조할 수 없습니다.
export class SetNicknameRequestDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @ApiProperty({
    name: 'nickname',
    description: '새로운 유저 닉네임',
    example: 'newNickname',
  })
  public nickname: string;
}
