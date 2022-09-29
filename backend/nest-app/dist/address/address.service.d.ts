import { Observable } from 'rxjs';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Address } from './address.entity';
export declare class AddressService {
    private readonly repo;
    constructor(repo: Repository<Address>);
    findAll(): Promise<Address[]>;
    createAddress(c: any): Observable<Address>;
    updateAddress(a: any): Observable<UpdateResult>;
    deleteAddress(id: number): Observable<DeleteResult>;
}
