import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('events')
export class EventsController {
    constructor(
        private readonly eventsService: EventsService,
    ) {}

    // Public
    @Get('upcoming')
    getUpcoming() {
        return this.eventsService.findUpcoming();
    }

    @Get('past')
    getPast() {
        return this.eventsService.findPast();
    }

    @Get(':id')
    getEvent(@Param('id', ParseIntPipe) id: number) {
        return this.eventsService.findOne(id);
    }

    // Admin only
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Get()
    getAll() {
        return this.eventsService.findAll();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post()
    create(@Body() dto: CreateEventDto) {
        return this.eventsService.create(dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEventDto) {
        return this.eventsService.update(id, dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.eventsService.remove(id);
    }
}
