import { Body, Controller, Post } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { UserCreatedDto } from './dto/user.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('webhook')
export class WebhookController {
  constructor(private webhookService: WebhookService) {}

  @ApiOperation({ summary: 'Webhook tạo user từ Clerk' })
  @Post('/sign-up')
  signUp(@Body() data: UserCreatedDto) {
    return this.webhookService.createUser(data);
  }
}
