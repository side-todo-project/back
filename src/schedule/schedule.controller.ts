import { Controller, Body, Post, Req, Get, Put } from '@nestjs/common';

import { makeScheduleRequestDto } from './dto/makeSchedule.request.dto';
import { updateScheduleRequestDto } from './dto/updateSchedule.request.dto';
import { getScheduleRequestDto } from './dto/getSchedule.request.dto';
import { scheduleResponseDto } from './dto/schedule.response.dto';
import { checkScheduleRequestDto } from './dto/checkSchedule.request.dto';

import { ScheduleService } from './schedule.service';
import { UserService } from '../user/user.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('schedule')
@Controller('api/schedule')
export class ScheduleController {
  constructor(
    private scheduleService: ScheduleService,
    private userService: UserService,
  ) {}

  @Post('/')
  @ApiOperation({ summary: '일정 생성하기' })
  @ApiBody({ type: makeScheduleRequestDto })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: scheduleResponseDto,
  })
  async setSchedule(@Req() req, @Body() data: makeScheduleRequestDto) {
    const userId = await this.userService.findUserByEmail(req.userEmail);

    return this.scheduleService.setSchedule(
      userId,
      data.scheduleDate,
      data.schedule,
      data.isPrivate,
      data.tags,
    );
  }

  @Get('/')
  @ApiOperation({ summary: '일정 가져오기' })
  @ApiBody({ type: getScheduleRequestDto })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: scheduleResponseDto,
  })
  async getSchedule(@Req() req, @Body() data: getScheduleRequestDto) {
    const userId = await this.userService.findUserByEmail(req.userEmail);
    return this.scheduleService.getSchedule(userId, data.scheduleDate);
  }

  @Put('/')
  @ApiOperation({ summary: '일정 수정하기' })
  @ApiBody({ type: updateScheduleRequestDto })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: scheduleResponseDto,
  })
  async updateSchedule(@Req() req, @Body() data: updateScheduleRequestDto) {
    const userId = await this.userService.findUserByEmail(req.userEmail);

    return this.scheduleService.updateSchedule(
      userId,
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
