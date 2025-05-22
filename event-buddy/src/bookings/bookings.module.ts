import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { User } from 'src/users/user.entity';
import { Event } from 'src/events/event.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Booking, User, Event]) // Add your entities here
    ],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService], // Export BookingsService if needed in other modules
})
export class BookingsModule {}
