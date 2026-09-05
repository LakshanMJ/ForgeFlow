import {
	IsArray,
	IsDateString,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUUID,
} from 'class-validator';

import { $Enums } from '@prisma/client';

export class CreateProjectDto {
	@IsNotEmpty()
	@IsString()
	name!: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsNotEmpty()
	@IsUUID()
	ownerId!: string;

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