import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-ptoduct.dto';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  /**
   * Create new product
   */
  public async create(dto: CreateProductDto) {
    const newProduct = this.productsRepository.create(dto);
    await this.productsRepository.save(newProduct);
    return {
      status: {
        success: true,
        timestamp: new Date(),
        statusCode: 200,
        message: 'Product created successfully',
        method: 'POST',
        path: '/products',
        errorCode: 0,
        errorMessage: null,
        errorDetails: null,
      },
      data: {
        newProduct,
      },
    };
  }

  /**
   * Get all products
   */
  public async getAll() {
    const products = await this.productsRepository.find();
    return {
      status: {
        success: true,
        timestamp: new Date(),
        statusCode: 200,
        message: 'Products fetched successfully',
        method: 'GET',
        path: '/products',
        errorCode: 0,
        errorMessage: null,
        errorDetails: null,
      },
      data: {
        products,
      },
      meta: {
        count: products.length,
        total: products.length,
        currentPage: 1,
        totalPages: 1,
        perPage: 10,
      },
    };
  }

  /**
   * Get product by id
   */
  public async getOneById(id: number) {
    const product = await this.productsRepository.findOne({ where: { id } });

    if (!product)
      throw new NotFoundException('Product not found', {
        cause: new Error(),
        description: 'Product not found',
      });
    return {
      status: {
        success: true,
        timestamp: new Date(),
        statusCode: 200,
        message: 'Product fetched successfully',
        method: 'GET',
        path: `/products/${id}`,
        errorCode: 0,
        errorMessage: null,
        errorDetails: null,
      },
      data: {
        product,
      },
    };
  }

  /**
   * Update product
   */
  public async update(id: number, dto: UpdateProductDto) {
    const product = await this.getOneById(id);

    product.data.product.title = dto.title ?? product.data.product.title;
    product.data.product.description =
      dto.description ?? product.data.product.description;
    product.data.product.price = dto.price ?? product.data.product.price;
    const updatedProduct = await this.productsRepository.save(
      product.data.product,
    );
    return {
      status: {
        success: true,
        timestamp: new Date(),
        statusCode: 200,
        message: 'Product updated successfully',
        method: 'PUT',
        path: `/products/${id}`,
        errorCode: 0,
        errorMessage: null,
        errorDetails: null,
      },
      data: {
        updatedProduct,
      },
    };
  }

  /**
   *  Delete product
   */

  public async delete(id: number) {
    const product = await this.getOneById(id);
    await this.productsRepository.remove(product.data.product);
    return {
      status: {
        success: true,
        timestamp: new Date(),
        statusCode: 200,
        message: 'Product deleted successfully',
        method: 'DELETE',
        path: `/products/${id}`,
        errorCode: 0,
        errorMessage: null,
        errorDetails: null,
      },
    };
  }
}
