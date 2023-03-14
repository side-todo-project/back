import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DataSource, Repository } from 'typeorm';
import { ISchedule } from './dto/makeSchedule.request.dto';
import { Schedules } from '../entities/schedule';

@Injectable()
export class ScheduleService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Schedules)
    private scheduleRepository: Repository<Schedules>,
  ) {}

  async setSchedule(
    userId: number,
    scheduleDate: Date,
    schedules: ISchedule[],
    isPrivate: boolean,
    tags: string[],
  ) {
    const json_schedules = JSON.stringify(schedules);
    const checkArr = Array.from({ length: schedules.length }, () => false);
    const schedule = new Schedules();
    schedule.scheduleDate = scheduleDate;
    schedule.schedule = json_schedules;
    schedule.isPrivate = isPrivate;
    schedule.check = checkArr;
    schedule.tags = tags;
    schedule.ScheduleOwnerId = userId;

    try {
      const result = await this.scheduleRepository.save(schedule);
      result.schedule = JSON.parse(result.schedule);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getSchedule(userId: number, scheduleDate: Date) {
    return await this.scheduleRepository.findOne({
      where: { scheduleDate: scheduleDate, ScheduleOwnerId: userId },
    });
  }

  async updateSchedule(
    userId: number,
    scheduleId: number,
    schedules: ISchedule[],
    isPrivate: boolean,
    tags: string[],
  ) {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: scheduleId },
    });

    if (!schedule) {
      return null;
    }
    const json_scheduless = JSON.stringify(schedules);
    const checkArr = Array.from({ length: schedules.length }, () => false);

    try {
      await this.dataSource
        .createQueryBuilder()
        .update(Schedules)
        .set({
          schedule: json_scheduless,
          isPrivate,
          tags,
          check: checkArr,
          ScheduleOwnerId: userId,
        })
        .where({ id: scheduleId })
        .execute();

      return await this.scheduleRepository.findOne({
        where: { id: schedule.id },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async checkSchedule(scheduleId: number, scheduleIdx: number) {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: scheduleId },
    });

    if (!schedule) {
      throw new NotFoundException('schedule is not found');
    }

    let checkArr = schedule.check;
    checkArr[scheduleIdx] = !checkArr[scheduleIdx];

    try {
      await this.dataSource
        .createQueryBuilder()
        .update(Schedules)
        .set({
          check: checkArr,
        })
        .where({ id: scheduleId })
        .execute();

      return await this.scheduleRepository.findOne({
        where: { id: schedule.id },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
