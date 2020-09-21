import { Request, Response, Router } from 'express';
import { autoInjectable } from 'tsyringe';
import { IController } from '../types/controllers';
import DockerService from '../services/docker-service';

@autoInjectable()
export default class DockerController implements IController {
  dockerService: DockerService;

  constructor(dockerService: DockerService) {
    this.dockerService = dockerService;
  }

  getAllContainers = async (_req: Request, res: Response): Promise<Response> => {
    const response = await this.dockerService.getAllContainers();

    return res.json(response);
  }

  getRouter = (): Router => {
    const router = Router();

    // Get all containers
    router.get('/containers', this.getAllContainers);

    return router;
  }
}
