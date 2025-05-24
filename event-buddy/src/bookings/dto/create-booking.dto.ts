// src/bookings/dto/create-booking.dto.ts
import { IsInt, IsPositive, Max } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  eventId: number;

  @IsInt()
  @IsPositive()
  @Max(4, { message: 'You can book a maximum of 4 seats' })
  seats: number;
}
