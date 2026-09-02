import {
    IsNumber,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

export class CreateDepartmentDto {
    @IsString()
    @MinLength(1)
    name!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    managerId?: string;

    @IsOptional()
    @IsNumber()
    openPositions?: number;
}