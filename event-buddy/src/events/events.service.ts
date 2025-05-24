import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './event.entity';
import { Booking } from 'src/bookings/booking.entity';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event) private eventsRepository: Repository<Event>,
    ) {}

    async findUpcoming() {
    return this.eventsRepository.find({
      where: { date: MoreThan(new Date()) },
      order: { date: 'ASC' },
    });
  }

  async findPast() {
    return this.eventsRepository.find({
      where: { date: LessThan(new Date()) },
      order: { date: 'DESC' },
    });
  }

  async findAll() {
    return this.eventsRepository.find({ order: { date: 'DESC' } });
  }

  async findOne(id: number) {
    const event = await this.eventsRepository.findOne({ where: { id } });
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

    async create(data: CreateEventDto): Promise<Event> {
    const event = this.eventsRepository.create({
        ...data,
        tags: data.tags.join(','), // convert array to comma-separated string
    });

    return await this.eventsRepository.save(event);
    }


  async update(id: number, data: UpdateEventDto) {
    const event = await this.findOne(id);
    Object.assign(event, data);
    return this.eventsRepository.save(event);
  }

  async remove(id: number) {
    const event = await this.findOne(id);
    return { message: `Event with ID ${id} has been successfully deleted.` };
  }
}
