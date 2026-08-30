import {
    IsEmail,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';

export class InviteUserDto {
    @IsString()
    firstName!: string;

    @IsString()
    lastName!: string;

    @IsEmail()
    email!: string;

    @IsOptional()
    @IsString()
    jobTitle?: string;

    @IsOptional()
    @IsUUID()
    departmentId?: string;

    @IsOptional()
    @IsUUID()
    roleId?: string;
}