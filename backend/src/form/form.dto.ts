import { ApiProperty } from "@nestjs/swagger";
import { IntakeFormData } from "./interface";

export class CreateFormDTO{
@ApiProperty({
    description: 'Submission ID',
})
submissionId: string;

@ApiProperty({
    description: 'Form ID',
})
formId: string;

@ApiProperty({
    description: 'Form data',

})
data: IntakeFormData;
}