// src/events/dto/create-event.dto.ts
import { IsArray, IsDateString, IsInt, IsNotEmpty, isNumber, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsDateString()
  date: string;

  @IsInt()
  totalCapacity: number;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsOptional()
  @IsString()
  image?: string;

}
