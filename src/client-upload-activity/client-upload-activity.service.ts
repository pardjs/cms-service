import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {v4 as uuidv4} from 'uuid';
import { ClientUploadCallback } from './client-upload-callback.entity';
import { ClientUploadRequest } from './client-upload-request.entity';
import { CreateCallbackDto } from './create-callback.dto';

@Injectable()
export class ClientUploadActivityService {
  constructor(
    @InjectRepository(ClientUploadRequest)
    private readonly requestRepository: Repository<ClientUploadRequest>,
    @InjectRepository(ClientUploadCallback)
    private readonly callbackRepository: Repository<ClientUploadCallback>,
  ) {}

  public createRequest(userId: number) {
    const request = this.requestRepository.create({
      dir: uuidv4(),
      userId,
    });
    return this.requestRepository.save(request);
  }

  public createCallback(data: CreateCallbackDto) {
    const callback = this.callbackRepository.create(data);
    return this.requestRepository.save(callback);
  }
}
