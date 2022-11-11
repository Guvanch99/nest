import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductsModel } from './products.model';
import { Op, OrderItem } from 'sequelize';

interface TObject {
  where?: {
    feature?: boolean;
    company?: string;
    name?: any;
  };
  order?: OrderItem;
  attributes?: string[];
}
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ProductsModel) private productsRepo: typeof ProductsModel,
  ) {}

  async getAllProducts(query) {
    const { feature, company, name, sort, fields } = query;
    const defaultAttributes = [
      'id',
      'name',
      'price',
      'feature',
      'rating',
      'company',
    ];
    let objectFilter: TObject = {
      where: {},
    };
    if (feature) {
      objectFilter.where.feature = feature;
    }
    if (company) {
      objectFilter.where.company = company;
    }
    if (name) {
      objectFilter.where.name = {
        [Op.regexp]: name,
      };
    }
    if (sort) {
      const [sortBy, type] = sort.split(',');
      objectFilter.order = [sortBy, type.toUpperCase()];
    }
    if (fields) {
      objectFilter.attributes = fields.split(',');
    }
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 10;
    const offset = (page - 1) * limit;

    return await this.productsRepo.findAll({
      where: objectFilter?.where,
      order: [objectFilter?.order],
      limit,
      offset,
      attributes: objectFilter?.attributes.length
        ? objectFilter?.attributes
        : defaultAttributes,
    });
  }
}
