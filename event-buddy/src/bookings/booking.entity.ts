// src/bookings/booking.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Event } from '../events/event.entity';
import { User } from '../users/user.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  @ManyToOne(() => Event, (event) => event.bookings)
  event: Event;

  @Column()
  seats: number;

  @CreateDateColumn()
  createdAt: Date;
}
