import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('users-addresses/:id')
  find(@Param('id') id: string) {
    return this.addressService.findUsersAddresses(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(id, updateAddressDto);
  }

  @Post('add-users-address')
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.addUsersAddress(createAddressDto);
  }

  @Delete('remove-users-address/:id')
  removeUsersAddress(@Param('id') id: string) {
    return this.addressService.removeUsersAddress(id);
  }
}
