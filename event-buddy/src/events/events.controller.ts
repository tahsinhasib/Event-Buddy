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

    // Public (dynamic)
    @Get('upcoming')
    getUpcoming() {
        return this.eventsService.findUpcoming();
    }

    @Get('past')
    getPast() {
        return this.eventsService.findPast();
    }

    // Admin only
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Get('get-all')
    getAll() {
        return this.eventsService.findAll();
    }

    // Admin only for creating events
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post('create-event')
    create(@Body() dto: CreateEventDto) {
        return this.eventsService.create(dto);
    }

    // Admin only for updating events
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Patch('update/:id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEventDto) {
        return this.eventsService.update(id, dto);
    }

    // 
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Delete('delete/:id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.eventsService.remove(id);
    }


    // Public (dynamic)
    @Get('details/:id')
    getEvent(@Param('id', ParseIntPipe) id: number) {
        return this.eventsService.findOne(id);
    }

    

    
}
