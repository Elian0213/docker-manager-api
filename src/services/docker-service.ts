import { autoInjectable, inject } from 'tsyringe';

@autoInjectable()
export default class DiscordService {
  config: Config;

  constructor(@inject('Config') config: Config) {
    this.config = config;
  }

  /**
   * Fetch all containers on current machine.
   */
  getAllContainers = async() => {
    // Placeholder
    return {
      containers: [],
    }
  }
}
