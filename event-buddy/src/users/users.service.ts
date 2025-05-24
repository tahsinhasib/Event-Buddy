import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) {}

    async create(data: RegisterDto & { password: string }) {
        const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
    }

    async findByEmail(email: string) {
        return this.usersRepository.findOne({ where: { email } });
    }

    async findById(id: number) {
        return this.usersRepository.findOne({ where: { id } });
    }
}
