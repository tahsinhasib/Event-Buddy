import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
    constructor(
        private readonly bookingsService: BookingsService, // Replace 'any' with the actual type of your service
    ) {}

    @Post()
    create(@Body() dto: CreateBookingDto, @Req() req) {
        return this.bookingsService.create(dto, req.user);
    }

    @Get('my')
    myBookings(@Req() req) {
        return this.bookingsService.findUserBookings(req.user.id);
    }
}
