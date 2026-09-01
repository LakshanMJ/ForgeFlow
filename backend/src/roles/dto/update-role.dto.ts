import {
    IsArray,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';

export class UpdateRoleDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    displayName?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true })
    permissionIds?: string[];

    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true })
    userIds?: string[];
}