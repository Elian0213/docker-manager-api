type Config = {
  ExpressPort: number;
  Security: {
    saltRounds: number,
    defaultAccount: {
      username: string;
      password: string;
      email: string;
  }
  }
  Database: {
    user: string;
    host: string;
    database: string;
    password: string;
    port: string;
  }
}
