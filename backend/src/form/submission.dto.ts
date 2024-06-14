import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString, ValidateNested } from "class-validator";
import { IntakeFormData } from "./interface";

export class SubmissionDataDTO {
    @ApiProperty({
        description: 'Intake form data',
    })
    @ValidateNested({ each: true })
    data: IntakeFormData
}

export class FormSubmissionDTO {
    data: {
      submission: CreateFormSubmissionDTO
    }
}

export class CreateFormSubmissionDTO {
    @ApiProperty({
        description: 'Submission ID',
    })
    @IsString()
    id: string;

    @ApiProperty({
        description: 'Form version ID',
    })
    @IsString()
    formVersionId: string;

    @ApiProperty({
        description: 'Confirmation ID',
    })
    @IsString()
    confirmationId: string;

    @ApiProperty({
        description: 'Boolean value to indiciate whether the form is a draft or not',
    })
    @IsBoolean()
    draft: boolean;

    @ApiProperty({
        description: 'Boolean value to indiciate whether the form has been deleted or not',
    })
    @IsBoolean()
    deleted: boolean;

    @ApiProperty({
        description: 'Submission data',
    })
    @ValidateNested({ each: true })
    submission: SubmissionDataDTO
}
