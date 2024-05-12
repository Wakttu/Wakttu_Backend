"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return await this.prisma.user.create({ data });
    }
    async findById(id) {
        const response = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                score: true,
                roomId: true,
                password: true,
            },
        });
        return response;
    }
    async findByName(name) {
        const response = await this.prisma.user.findUnique({
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
    async roomCreate(id, roomId) {
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
    async enter(id, roomId) {
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
    async exit(id) {
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
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map