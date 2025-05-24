// src/events/dto/create-event.dto.ts
import { IsArray, IsDateString, IsInt, IsNotEmpty, isNumber, IsOptional, IsString, Matches } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsDateString()
  date: string;
  
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Time must be in HH:mm format',
  })
  time: string; // e.g., "18:30"

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsInt()
  totalCapacity: number;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsOptional()
  @IsString()
  image?: string;

}
