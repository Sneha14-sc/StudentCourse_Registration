import { Address } from './address.entity';
import { AddressService } from './address.service';
export declare class AddressController {
    private addressService;
    private broker;
    private topicArray;
    private serviceName;
    constructor(addressService: AddressService);
    module_init(): Promise<void>;
    findAll(): Promise<Address[]>;
}
