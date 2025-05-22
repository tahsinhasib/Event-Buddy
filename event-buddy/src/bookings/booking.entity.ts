// src/bookings/booking.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Event } from '../events/event.entity';

@Entity()
@Unique(['user', 'event']) // Prevent duplicate bookings
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  @ManyToOne(() => Event, (event) => event.bookings)
  event: Event;

  @Column()
  seats: number;

  @Column()
  eventLocation: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column('simple-array') // stores as CSV: "tag1,tag2"
  tags: string[];

  @Column({ nullable: true })
  image: string;
}
