import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ReviewsService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  /**
   * Get all reviews
   */
  public getAll() {
    return [
      { id: 1, rating: 4, comment: 'Good product', productId: 1 },
      { id: 2, rating: 4, comment: 'Good product', productId: 2 },
    ];
  }
}
