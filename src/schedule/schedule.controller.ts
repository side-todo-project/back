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
import { Response } from 'express';

import { makeScheduleRequestDto } from './dto/makeSchedule.request.dto';
import { updateScheduleRequestDto } from './dto/updateSchedule.request.dto';
import { getScheduleRequestDto } from './dto/getSchedule.request.dto';
import { scheduleResponseDto } from './dto/schedule.response.dto';
import { checkScheduleRequestDto } from './dto/checkSchedule.request.dto';

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
      req.userId,
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
    return this.scheduleService.getSchedule(req.userId, data.scheduleDate);
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
      req.userId,
      data.scheduleId,
      data.schedule,
      data.isPrivate,
      data.tags,
    );
  }

  @Put('/check')
  @ApiOperation({
    summary: '완료된 일정 체크하기',
    description:
      '체크하거나 체크를 해제할 일정의 idx를 보내주시면 됩니다 idx는 0부터 시작입니다.',
  })
  @ApiBody({ type: checkScheduleRequestDto })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: scheduleResponseDto,
  })
  async checkSchedule(@Req() req, @Body() data: checkScheduleRequestDto) {
    return this.scheduleService.checkSchedule(
      data.scheduleId,
      data.scheduleIdx,
    );
  }
}
