import { Address } from 'src/address/entities/address.entity';
import { Permission } from 'src/permission/entities/permission.entity';
import { Phone } from 'src/phone/entities/phone.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ name: 'date_of_birth', type: 'date', nullable: true })
  date_of_birth?: Date;

  @Column({ name: 'phone_number', length: 255, nullable: true })
  phone_number?: string;

  @Column('text', { nullable: true })
  address?: string;

  @Column({ length: 255, nullable: true })
  city?: string;

  @Column({ length: 255, nullable: true })
  country?: string;

  @Column({ name: 'state_province', length: 255, nullable: true })
  state_province?: string;

  @Column({ name: 'postal_code', length: 255, nullable: true })
  postal_code?: string;

  @Column({ length: 255, nullable: true, default: 'en' })
  language?: string;

  @Column({ length: 255, nullable: true })
  role?: string;

  @Column({ length: 255, nullable: true })
  sector?: string;

  @Column({ name: 'email_notifications', default: false })
  email_notifications: boolean;

  @Column({ name: 'sms_notifications', default: false })
  sms_notifications: boolean;

  @Column({ name: 'web_notifications', default: false })
  web_notifications: boolean;

  @Column({ nullable: true })
  avatar: string;

  @OneToMany(() => Address, (address) => address.user, {
    eager: true,
    onDelete: 'CASCADE',
  })
  addresses?: Address[];

  @OneToMany(() => Phone, (phone) => phone.user, {
    eager: true,
    onDelete: 'CASCADE',
  })
  phones?: Phone[];

  @ManyToMany(() => Permission, (permission) => permission.users, {
    eager: true,
  })
  @JoinTable({
    name: 'user_permissions',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'permission_id' },
  })
  permissions: Permission[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
