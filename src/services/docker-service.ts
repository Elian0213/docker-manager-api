import { autoInjectable, inject } from 'tsyringe';
import * as Docker from 'dockerode';

@autoInjectable()
export default class DockerService {
  Docker = new Docker();

  config: Config;

  constructor(@inject('Config') config: Config) {
    this.config = config;
  }

  /**
   * Fetch all containers on current machine.
   */
  getAllContainers = async (): Promise<unknown> => new Promise((resolve, reject) => {
    this.Docker.listContainers((err, containers) => {
      if (err) reject(err);
      resolve(containers);
    });
  })
}
