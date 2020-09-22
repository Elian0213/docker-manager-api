import * as Knex from 'knex';
import { UsersTable } from './tables/users';

/**
 * Each table is split into it's own public property
 * @property {UsersTable} users This contains users used to authenticate
 */
export class DBController {
  public readonly users: UsersTable;

  private readonly db: Knex;

  constructor(config: Config) {
    this.db = Knex({
      client: 'pg',
      connection: config.Database,
    });

    this.users = new UsersTable(this.db, config);
  }

  init = (): string => 'Database initialized!'
}

export default DBController;
