import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDepartmentDto {
    @IsOptional()
    @IsString()
    name?: string;

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