import { ApiProperty } from "@nestjs/swagger";
import { Ministry } from "../../../common/enums";

export class DivisionRO{
    @ApiProperty({
        description: 'Division ID',
        example: 1,
    })
    id: number;
    
    @ApiProperty({
        description: 'Division Name',
        example: 'Division 1',
    })
    divisionName: string;
    
    @ApiProperty({
        description: 'Division Code',
        example: Ministry.AF,
    })
    ministry: Ministry;
}