import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './address.entity';
import { Student } from 'src/students/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  providers: [AddressService],
  controllers: [AddressController]
})
export class AddressModule {}
