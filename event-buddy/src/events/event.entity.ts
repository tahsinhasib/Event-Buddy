// src/events/event.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Booking } from '../bookings/booking.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column()
  totalCapacity: number;

  @Column({ default: 0 })
  bookedSeats: number;

  @OneToMany(() => Booking, (booking) => booking.event)
  bookings: Booking[];
}
