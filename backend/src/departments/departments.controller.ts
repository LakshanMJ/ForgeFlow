import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';

import { DepartmentsService } from './departments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller('departments')
export class DepartmentsController {
    constructor(
        private readonly departmentsService: DepartmentsService,
    ) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getDepartments(@Req() req: any) {
        return this.departmentsService.getDepartments(
            req.user.organizationId,
        );
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createDepartment(
        @Req() req: any,
        @Body() dto: CreateDepartmentDto,
    ) {
        console.log('DTO:', dto);

        return this.departmentsService.createDepartment(
            dto,
            req.user.organizationId,
        );
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async updateDepartment(
        @Param('id') id: string,
        @Req() req: any,
        @Body() dto: UpdateDepartmentDto,
    ) {
        console.log('PATCH CONTROLLER HIT');
        console.log('PARAM ID:', id);
        console.log('BODY:', dto);

        return this.departmentsService.updateDepartment(
            id,
            dto,
            req.user.organizationId,
        );
    }
}