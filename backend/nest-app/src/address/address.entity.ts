import {Entity, Column,  PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Address{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    street_address: string;

    @Column()
    landmark: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    country: string;

    @Column()
    zipcode: number

    
}