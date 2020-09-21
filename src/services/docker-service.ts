import { autoInjectable, inject } from 'tsyringe';
import * as Dckr from 'dockerode';

@autoInjectable()
export default class DockerService {
  Docker = new Dckr();

  config: Config;

  constructor(@inject('Config') config: Config) {
    this.config = config;
  }

  /**
   * Fetch all containers on current machine.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAllContainers = async (): Promise<any> => new Promise((resolve, reject) => {
    this.Docker.listContainers((err, containers) => {
      if (err) reject(err);
      resolve(containers);
    });
  })
}
