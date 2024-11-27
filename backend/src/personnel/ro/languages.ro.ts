import { ApiProperty } from '@nestjs/swagger';

export class BcwsLanguagesRO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  proficiency: string;
  @ApiProperty()
  level: string;
}
