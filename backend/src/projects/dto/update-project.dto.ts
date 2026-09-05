import {
    IsArray,
    IsDateString,
    IsEnum,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';

import { $Enums } from '@prisma/client';

export class UpdateProjectDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsUUID()
    ownerId?: string;

    @IsOptional()
    @IsUUID()
    categoryId?: string;

    @IsOptional()
    @IsEnum($Enums.ProjectStatus)
    status?: $Enums.ProjectStatus;

    @IsOptional()
    @IsEnum($Enums.ProjectPriority)
    priority?: $Enums.ProjectPriority;

    @IsOptional()
    @IsEnum($Enums.ProjectColor)
    color?: $Enums.ProjectColor;

    @IsOptional()
    @IsDateString()
    startDate?: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;

    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true })
    members?: string[];
}