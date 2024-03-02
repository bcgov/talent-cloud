import { ApiProperty } from "@nestjs/swagger";
import { Region } from "../common/enums";

export class WorkLocationRO {
  @ApiProperty({
    description: 'Location id',
    required: false,
    example: 1,
  })
    id: number;

    @ApiProperty({
        description: 'Location name',
        required: true,
        example: 'Victoria',
    })
    locationName: string;

    @ApiProperty({
        description: 'Region of location',
        required: true,
        example: Region.SWE,
    })
    region: Region

  }