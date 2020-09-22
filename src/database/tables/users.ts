// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import * as Knex from 'knex';
import * as bcrypt from 'bcrypt';

export type User = {
  id: number;
  username: string;
  password: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * This is the Users database table. Here is where to
 * access the table.
 */
export class UsersTable {
  private readonly tableName = 'docker_manager.users'

  constructor(private readonly db: Knex, private readonly config: Config) {
    this.init();
  }

  public createUser(user: User): Promise<unknown> {
    return this.db(this.tableName)
      .returning('id')
      .insert(user)
      .catch((err) => {
        console.log(err);
      });
  }

  private init() {
    this.db.schema.hasTable(this.tableName)
      .then((exists) => {
        if (exists) {
          return;
        }

        this.db.schema
          .createTable(this.tableName, (t) => {
            t.increments();
            t.string('username');
            t.string('password');
            t.string('email');
            t.timestamps(true, true);
          })
          .then(() => {
            const adminAccount = this.config.Security.defaultAccount;

            this.createUser({
              username: adminAccount.username,
              email: adminAccount.email,
              password: this.hashPassword(adminAccount.password),
            } as User);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }

  private hashPassword(password): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(this.config.Security.saltRounds));
  }
}
