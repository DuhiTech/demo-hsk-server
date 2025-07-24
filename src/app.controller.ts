import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get('test')
  @ApiOperation({ summary: 'Hello world' })
  getHello() {
    return 'Hello world';
  }
}
