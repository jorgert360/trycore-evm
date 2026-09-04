import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ActivitiesService } from './activities.service.js';
import { CreateActivityDto } from './dto/create-activity.dto.js';
import { UpdateActivityDto } from './dto/update-activity.dto.js';

@ApiTags('activities')
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create an activity and calculate its EVM metrics',
  })
  @ApiCreatedResponse({
    description: 'Activity created with calculated EVM metrics.',
  })
  @ApiBadRequestResponse({ description: 'Invalid activity data.' })
  @ApiNotFoundResponse({ description: 'Project not found.' })
  create(@Body() createActivityDto: CreateActivityDto) {
    return this.activitiesService.create(createActivityDto);
  }

  @Get()
  @ApiOperation({
    summary: 'List all activities with EVM metrics',
  })
  @ApiOkResponse({
    description: 'Activities returned with calculated EVM metrics.',
  })
  findAll() {
    return this.activitiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get an activity with EVM metrics',
  })
  @ApiOkResponse({
    description: 'Activity returned with calculated EVM metrics.',
  })
  @ApiNotFoundResponse({ description: 'Activity not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.activitiesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update an activity and recalculate EVM metrics',
  })
  @ApiOkResponse({
    description: 'Activity updated and EVM metrics recalculated.',
  })
  @ApiBadRequestResponse({ description: 'Invalid activity data.' })
  @ApiNotFoundResponse({
    description: 'Activity or project not found.',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return this.activitiesService.update(id, updateActivityDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an activity' })
  @ApiOkResponse({ description: 'Activity deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Activity not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.activitiesService.remove(id);
  }
}