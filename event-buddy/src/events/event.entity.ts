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

  @Column({ type: 'time' })
  time: string; // e.g., "18:00:00"

  @Column()
  location: string;

  @Column({ type: 'varchar', nullable: true })
  tags: string; // comma-separated, e.g., "music,live,festival"

  @Column({ nullable: true })
  image: string; // URL or path to image

  @Column()
  totalCapacity: number;

  @Column({ default: 0 })
  bookedSeats: number;

  @OneToMany(() => Booking, (booking) => booking.event)
  bookings: Booking[];
}
