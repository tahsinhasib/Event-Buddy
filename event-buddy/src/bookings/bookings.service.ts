import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { In, Repository } from 'typeorm';
import { Event } from 'src/events/event.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class BookingsService {
    constructor(
        @InjectRepository(Booking) private bookingsRepository: Repository<Booking>,
        @InjectRepository(Event) private eventsRepository: Repository<Event>,
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) {}

    

    // bookings.service.ts

    async bookEvent(dto: CreateBookingDto, userId: number) {
    const event = await this.eventsRepository.findOne({ where: { id: dto.eventId } });
    if (!event) throw new NotFoundException('Event not found');

    if (event.bookedSeats + dto.seats > event.totalCapacity) {
        throw new BadRequestException('Not enough available seats');
    }

    const booking = this.bookingsRepository.create({
        user: { id: userId },        
        event: { id: dto.eventId },
        seats: dto.seats,
    });

    await this.bookingsRepository.save(booking);

    event.bookedSeats += dto.seats;
    await this.eventsRepository.save(event);

    return { message: 'Booking successful', booking };
    }



    async getUserBookings(user: User) {
        return this.bookingsRepository.find({
            where: { user: { id: user.id } },
            relations: ['event'],
            order: { createdAt: 'DESC' },
        });
    }
}
