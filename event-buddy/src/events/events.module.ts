import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { Booking } from 'src/bookings/booking.entity';
import { User } from '../users/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Event, Booking, User]) // Add your entities here
    ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService], // Export EventsService if needed in other modules
})
export class EventsModule {}
