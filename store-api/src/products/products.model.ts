import { Column, DataType, Model, Table } from 'sequelize-typescript';

export const companyEnum = ['ikea', 'liddy', 'caressa', 'marcos'];

export interface IProductsModel {
  name: string;
  price: number;
  feature: boolean;
  rating: number;
  company: string;
}

@Table({ tableName: 'products' })
export class ProductsModel extends Model<ProductsModel, IProductsModel> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.REAL })
  price: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  feature: boolean;

  @Column({ type: DataType.REAL, defaultValue: 4.5 })
  rating: number;

  @Column({ type: DataType.ENUM({ values: companyEnum }) })
  company: string;
}
