import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateProjectCategoryDto {
    @IsString()
    @MaxLength(100)
    name!: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    description?: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    color?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsBoolean()
    isSystem?: boolean;
}