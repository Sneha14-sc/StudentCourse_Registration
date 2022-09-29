"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const address_service_1 = require("./address.service");
const broker_1 = require("../rmq/broker");
let AddressController = class AddressController {
    constructor(addressService) {
        this.addressService = addressService;
        this.broker = broker_1.Broker.getInstance();
        this.topicArray = ['ADDRESS_ADD', 'ADDRESS_UPDATE', 'ADDRESS_DELETE'];
        this.serviceName = ['IOT_SERVICE', 'IOT_SERVICE', 'IOT_SERVICE'];
        this.module_init();
    }
    async module_init() {
        for (var i = 0; i < this.topicArray.length; i++) {
            this.broker.listenToService(this.topicArray[i], this.serviceName[i], (() => {
                var value = this.topicArray[i];
                return async (result) => {
                    let responseModelwithDto;
                    try {
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
                        for (var i = 0; i < result.OnSuccessTopicsToPush.length; i++) {
                            const topicName = result.OnSuccessTopicsToPush[i];
                            this.broker.PublicMessageToTopic(topicName, responseModelwithDto);
                        }
                    }
                    catch (error) {
                        console.log('Error Occured while listening to queues');
                        console.log(error, result);
                        for (var i = 0; i < result.OnFailureTopicsToPush.length; i++) {
                            const topicName = result.OnFailureTopicsToPush[i];
                            this.broker.PublicMessageToTopic(topicName, responseModelwithDto);
                        }
                    }
                };
            })());
        }
    }
    findAll() {
        return this.addressService.findAll();
    }
};
__decorate([
    (0, common_2.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "findAll", null);
AddressController = __decorate([
    (0, common_1.Controller)('address'),
    __metadata("design:paramtypes", [address_service_1.AddressService])
], AddressController);
exports.AddressController = AddressController;
//# sourceMappingURL=address.controller.js.map