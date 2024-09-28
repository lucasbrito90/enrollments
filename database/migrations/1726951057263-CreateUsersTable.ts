import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1726951057263 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isUnique: true,
          },
          {
            name: 'date_of_birth',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'phone_number',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'address',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'country',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'state_province',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'postal_code',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'sector',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'role',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'language',
            type: 'varchar',
            length: '255',
            default: "'en'",
            isNullable: true,
          },
          {
            name: 'email_notifications',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'sms_notifications',
            type: 'boolean',
            length: '255',
            isNullable: true,
          },
          {
            name: 'web_notifications',
            type: 'boolean',
            length: '255',
            isNullable: true,
          },
          {
            name: 'avatar',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
