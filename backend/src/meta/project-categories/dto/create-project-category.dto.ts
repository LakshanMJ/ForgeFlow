import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateProjectCategoryDto {
    @IsString()
    @MaxLength(100)
    name!: string;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;

    @IsOptional()
    @IsString()
    color?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}