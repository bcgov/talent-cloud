import { ApiProperty } from "@nestjs/swagger";
import { BcwsRole, Section } from "../../common/enums";

export class RolesRO {
  @ApiProperty({
    description: 'Section',
    required: true,
    example: Section.PLANNING,
  })
  section: string;

  @ApiProperty({
    description: 'Id',
    required: true,
    example: '14',
  })
  id: number;

  @ApiProperty({
    description: 'Name',
    required: true,
    example: BcwsRole.GIS_SPECIALIST,
  })
  name: BcwsRole;
}