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

    async create(dto: CreateBookingDto, user: User) {
    const event = await this.eventsRepository.findOne({ where: { id: dto.eventId } });
    if (!event) throw new NotFoundException('Event not found');

    if (new Date(event.date) < new Date()) {
      throw new BadRequestException('Cannot book past event');
    }

    const existing = await this.bookingsRepository.findOne({
      where: { user: { id: user.id }, event: { id: dto.eventId } },
    });

    if (existing) {
      throw new BadRequestException('Already booked this event');
    }

    if (event.bookedSeats + dto.seats > event.totalCapacity) {
      throw new BadRequestException('Not enough seats available');
    }

    event.bookedSeats += dto.seats;
    await this.eventsRepository.save(event);

    const booking = this.bookingsRepository.create({
      user,
      event,
      seats: dto.seats,
    });

    return this.bookingsRepository.save(booking);
  }

  async findUserBookings(userId: number) {
    return this.bookingsRepository.find({
      where: { user: { id: userId } },
      relations: ['event'],
      order: { createdAt: 'DESC' },
    });
  }
}
