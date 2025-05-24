import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/common/enums/role.enum';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
    constructor(
        private readonly bookingsService: BookingsService, // Replace 'any' with the actual type of your service
    ) {}

    @Post("book-event")
    book(@Body() dto: CreateBookingDto, @Req() req) {
        return this.bookingsService.bookEvent(dto, req.user.userId);
    }


    @Get('my-bookings')
    @UseGuards(JwtAuthGuard) // Ensure only authenticated users can view their bookings
    myBookings(@Req() req) {
        return this.bookingsService.getUserBookings(req.user);
    }
}
