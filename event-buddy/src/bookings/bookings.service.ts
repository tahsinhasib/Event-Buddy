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
    ) {}

    async bookEvent(user: User, dto: CreateBookingDto) {
        const event = await this.eventsRepository.findOne({
            where: { id: dto.eventId },
        });

        if (!event) {
            throw new NotFoundException('Event not found');
        }

        if (new Date(event.date) < new Date()) {
            throw new BadRequestException('Cannot book past events');
        }

        const currentBooked = event.bookedSeats ?? 0;
        const updatedSeats = currentBooked + dto.seats;

        if (updatedSeats > event.totalCapacity) {
            throw new BadRequestException('Not enough available seats');
        }

        // Create booking
        const booking = this.bookingsRepository.create({
            user,
            event,
            seatsBooked: dto.seats,
        });

        await this.bookingsRepository.save(booking);

        // Use .save instead of .update
        event.bookedSeats = updatedSeats;
        await this.eventsRepository.save(event);


        return {
            message: 'Booking successful',
            booking,
        };
    }



    async getUserBookings(user: User) {
        return this.bookingsRepository.find({
        where: { user: { id: user.id } },
        relations: ['event'],
        order: { createdAt: 'DESC' },
    });
}
}
