import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

class Context {
  [key: string]: unknown;
}

class Contexts {
  @ApiProperty({ required: false, default: 0 })
  @IsNumber()
  @IsOptional()
  delayTS?: number;

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  bcc?: string[];

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  cc?: string[];

  @ApiProperty({ required: true })
  @IsString()
  tag?: string;

  @ApiProperty({ required: true })
  context: Context;

  @ApiProperty({
    required: true,
  })
  @IsArray()
  to: string[];

  constructor(data: Contexts) {
    Object.assign(this, data);
    this.bcc = data.bcc ?? [];
    this.cc = data.cc ?? [];
    this.delayTS = data?.delayTS ?? 0;
  }
}

class AttachmentDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  contentType: string;

  @ApiProperty()
  encoding: string;

  @ApiProperty()
  filename: string;

  constructor(data: AttachmentDto) {
    Object.assign(this, data);
  }
}

export class MailDto {
  @ApiProperty({ required: true })
  @IsString()
  body: unknown;

  @ApiProperty()
  @IsString()
  bodyType?: string;

  @ApiProperty({
    default: 'utf-8',
  })
  @IsString()
  @IsOptional()
  encoding?: string;

  @ApiProperty({ default: 'noreply-core@gov.bc.ca', required: false })
  @IsString()
  @IsOptional()
  from?: string;

  @ApiProperty({ default: 'normal', required: false })
  @IsString()
  @IsOptional()
  priority?: string;

  @ApiProperty({ required: true })
  @IsString()
  subject: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  attachments?: AttachmentDto[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  contexts?: Contexts[];

  constructor(data: MailDto) {
    Object.assign(this, data);

    this.encoding = data?.encoding ?? 'utf-8';
    this.from = data?.from ?? 'noreply-core@gov.bc.ca';
    this.priority = data?.priority ?? 'normal';
    this.bodyType = data.bodyType ?? 'html';
    this.attachments = data.attachments
      ? data.attachments.map((itm) => new AttachmentDto(itm))
      : [];
    this.contexts = data.contexts
      ? data.contexts.map((itm) => new Contexts(itm))
      : [];
  }
}
