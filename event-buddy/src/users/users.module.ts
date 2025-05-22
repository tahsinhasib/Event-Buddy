import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Booking } from 'src/bookings/booking.entity';
import { Event } from 'src/events/event.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Booking, Event])], // Add your entities here
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService], // Export UsersService if needed in other modules
})
export class UsersModule {}
