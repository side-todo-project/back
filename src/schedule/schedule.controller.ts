import {
  Controller,
  Body,
  Post,
  Req,
  Get,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { makeScheduleRequestDto } from './dto/makeSchedule.request.dto';
import { updateScheduleRequestDto } from './dto/updateSchedule.request.dto';
import { getScheduleRequestDto } from './dto/getSchedule.request.dto';
import { scheduleResponseDto } from './dto/schedule.response.dto';
import { checkScheduleRequestDto } from './dto/checkSchedule.request.dto';

import { ScheduleService } from './schedule.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import dotenv from 'dotenv';
import { latestScheduleResponseDto } from './dto/latestSchedule.response.dto';
import { getOtherScheduleRequestDto } from './dto/getOtherSchedule.request.dto';
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
  async getSchedule(@Req() req, @Query() data: getScheduleRequestDto) {
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

  @Get('/latest')
  @ApiOperation({
    summary: '공개된 최신 일정기불러오기',
    description: '공개된 최신 일정을 최대 8개 불러옵니다.',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: [latestScheduleResponseDto],
  })
  async getLatestSchedules() {
    return this.scheduleService.getLatestSchedule();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/other')
  @ApiOperation({ summary: '남의 일정 가져오기' })
  @ApiBody({ type: getOtherScheduleRequestDto })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: scheduleResponseDto,
  })
  async getOtherSchedule(
    @Req() req,
    @Query() data: getOtherScheduleRequestDto,
  ) {
    return this.scheduleService.getOtherSchedule(data.scheduleId);
  }
}
