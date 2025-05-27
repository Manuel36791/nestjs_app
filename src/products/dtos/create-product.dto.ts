import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({
    message: 'Name is required, it cannot be empty, please provide a name',
  })
  @Length(3, 255, { message: 'Name must be between 3 and 150 characters long' })
  title: string;

  @IsString({ message: 'Description must be a string' })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'Price must be greater than 0' })
  price: number;
}
