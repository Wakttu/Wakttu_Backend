import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { WakgamesService } from 'src/wakgames/wakgames.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly wakgamesService: WakgamesService,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({ data });
  }

  async findById(id: string) {
    const response = await this.prisma.user.findUnique({
      where: { id },
      include: { keyboard: { include: { emoji: true } } },
    });
    return response;
  }

  async findByName(name: string) {
    const response = await this.prisma.user.findFirst({
      where: { name },
      select: {
        id: true,
        name: true,
        score: true,
        roomId: true,
        password: false,
      },
    });
    return response;
  }
  async roomCreate(id: string, roomId: string) {
    const response = await this.prisma.user.update({
      where: { id },
      data: {
        room: { connect: { id: roomId } },
      },
      include: {
        room: {
          include: {
            users: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    return response.room;
  }
  async enter(id: string, roomId: string) {
    const response = await this.prisma.user.update({
      where: { id },
      data: {
        room: { connect: { id: roomId } },
      },
      include: {
        room: {
          include: {
            users: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    return response.room;
  }

  async exit(id: string) {
    const response = await this.prisma.user.update({
      where: { id },
      data: {
        room: { disconnect: true },
      },
      include: {
        room: true,
      },
    });
    return response.room;
  }

  async getKeyboard(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
      select: { keyboard: true, emoji: true },
    });
  }
}
