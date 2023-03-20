import {
  Controller,
  Body,
  Post,
  Req,
  Get,
  Put,
  UseGuards,
  Res,
  Redirect,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { makeScheduleRequestDto } from './dto/makeSchedule.request.dto';
import { updateScheduleRequestDto } from './dto/updateSchedule.request.dto';
import { getScheduleRequestDto } from './dto/getSchedule.request.dto';
import { scheduleResponseDto } from './dto/schedule.response.dto';

import { ScheduleService } from './schedule.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Public } from 'src/auth/skip-auth.decorator';

import dotenv from 'dotenv';
dotenv.config();

@ApiTags('schedule')
@Controller('api/schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/test')
  async test(@Req() req: Request) {
    console.log(req.user.userId);
    return 'ok';
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @ApiOperation({ summary: '일정 생성하기' })
  @ApiBody({ type: makeScheduleRequestDto })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: scheduleResponseDto,
  })
  async setSchedule(@Req() req, @Body() data: makeScheduleRequestDto) {
    return this.scheduleService.setSchedule(
      req.user.userId,
      data.scheduleDate,
      data.schedule,
      data.isPrivate,
      data.tags,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  @ApiOperation({ summary: '일정 가져오기' })
  @ApiBody({ type: getScheduleRequestDto })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: scheduleResponseDto,
  })
  async getSchedule(@Req() req, @Body() data: getScheduleRequestDto) {
    return this.scheduleService.getSchedule(req.user.userId, data.scheduleDate);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/')
  @ApiOperation({ summary: '일정 수정하기' })
  @ApiBody({ type: updateScheduleRequestDto })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: scheduleResponseDto,
  })
  async updateSchedule(@Req() req, @Body() data: updateScheduleRequestDto) {
    return this.scheduleService.updateSchedule(
      req.user.userId,
      data.scheduleId,
      data.schedule,
      data.isPrivate,
      data.tags,
    );
  }
}
