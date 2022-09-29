import { Controller } from '@nestjs/common';
import { Get, Post,Put, Delete, Body, Param } from  '@nestjs/common';
import { Address } from './address.entity';
import { AddressService } from './address.service';
import { Broker } from '../rmq/broker';
import addressDto from '../Dto/address.dto';
import ResponseModel from '../Dto/responseModel';


@Controller('address')
export class AddressController {
    private broker = Broker.getInstance();
    //Topics We need for the controller
    private topicArray = ['ADDRESS_ADD', 'ADDRESS_UPDATE', 'ADDRESS_DELETE'];
    private serviceName = ['IOT_SERVICE', 'IOT_SERVICE', 'IOT_SERVICE'];
  
    constructor(private addressService: AddressService) {
      this.module_init();
    }
  
    async module_init() {
      for (var i = 0; i < this.topicArray.length; i++) {
        this.broker.listenToService(
          this.topicArray[i],
          this.serviceName[i],
          (() => {
            var value = this.topicArray[i];
            return async (result) => {
             // dto used to define how the data will be sent over network using typescript
              let responseModelwithDto: ResponseModel<addressDto>;
              try {
                //to check what user has requested to perform and select the case accordingly
                switch (value) {
                  case 'ADDRESS_ADD':
                    this.addressService.createAddress(result.message);
                    break;
                  case 'ADDRESS_UPDATE':
                    this.addressService.updateAddress(result.message);
                    break;
                  case 'ADDRESS_DELETE':
                    var id = result.message;
                    this.addressService.deleteAddress(id);
                    break;
                }
                responseModelwithDto = result;
                // borker
                for (var i = 0; i < result.OnSuccessTopicsToPush.length; i++) {
                  const topicName = result.OnSuccessTopicsToPush[i];
                  this.broker.PublicMessageToTopic(
                    topicName,
                    responseModelwithDto,
                  );
                }
              } catch (error) {
                console.log('Error Occured while listening to queues');
                console.log(error, result);
                for (var i = 0; i < result.OnFailureTopicsToPush.length; i++) {
                  const topicName = result.OnFailureTopicsToPush[i];
                  this.broker.PublicMessageToTopic(
                    topicName,
                    responseModelwithDto,
                  );
                }
              }
            };
          })(),
        );
      }
    }
    //add, update and delete done using rabbitMq but not get.
    @Get()
    findAll(): Promise<Address[]> {
      return this.addressService.findAll();
    }
}
