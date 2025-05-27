import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ReviewsService } from 'src/reviews/reviews.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => ReviewsService))
    private readonly reviewsService: ReviewsService,
  ) {}

  /**
   * Get all users
   */
  public getAll() {
    return [
      { id: 1, name: 'User 1', email: 'a@b.com' },
      { id: 2, name: 'User 2', email: 'c@d.com' },
    ];
  }
}
