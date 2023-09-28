import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const isTestEnv = this.configService.get<string>('NODE_ENV') === 'test';
    const databaseName = isTestEnv
      ? this.configService.get<string>('POSTGRES_DATABASE_TEST')
      : this.configService.get<string>('POSTGRES_DATABASE');

    return {
      type: this.configService.get<'postgres'>('DB_TYPE'),
      host: this.configService.get<string>('POSTGRES_HOST'),
      port: this.configService.get<number>('POSTGRES_PORT'),
      username: this.configService.get<string>('POSTGRES_USER'),
      password: this.configService.get<string>('POSTGRES_PASSWORD'),
      database: databaseName,
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: this.configService.get<boolean>('TYPEORM_SYNC'),
      logging: this.configService.get<boolean>('TYPEORM_LOGGING'),
      keepConnectionAlive: true,
    };
  }
}
