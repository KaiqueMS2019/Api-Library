import { IsNotEmpty, IsString, isString, MaxLength, MinLength } from 'class-validator';

export class AuthorDTD {

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    readonly name : string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    readonly surname: string;
}