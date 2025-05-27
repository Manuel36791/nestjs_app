import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
  IsOptional,
} from 'class-validator';

export class UpdateProductDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({
    message: 'Name is required, it cannot be empty, please provide a name',
  })
  @Length(3, 150, { message: 'Name must be between 3 and 150 characters long' })
  @IsOptional()
  title?: string;

  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'Price must be greater than 0' })
  @IsOptional()
  price?: number;
}
