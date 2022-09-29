import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Address } from './address.entity';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(Address) private readonly repo: Repository<Address>,
        // @InjectRepository(Address)
      ) {}
    
      findAll(): Promise<Address[]> {
        return this.repo.find();
      }
    
      createAddress(c): Observable<Address> {
        let addr1:Address= new Address();
         addr1 = c;
        return from(this.repo.save(addr1));
      }
    
      updateAddress(a): Observable<UpdateResult> {
        let id= a[0];
        let addr2:Address = a[1];
        return from(this.repo.update(id, addr2));
      }

      deleteAddress(id: number): Observable<DeleteResult> {
        return from(this.repo.delete(id));
      }
}
