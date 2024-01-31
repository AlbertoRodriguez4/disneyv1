import { Module, Global } from '@nestjs/common';

import { Client } from 'pg';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';


const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

const client = new Client({
  user: 'postgres',
  host: 'rds-dam-postgresql.cdc8o82kagmd.us-east-1.rds.amazonaws.com',
  database: 'dam',
  password: 'LUCASLUCAS',
  port: 5432,
  ssl: true, 
});
client.connect();
client.query('SELECT * FROM task ORDER BY id ASC', (err, res) => {
  console.error(err);
  console.log(res.rows);
});

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const {dbName, host, port, user, password} = configService.postgres;
        const client = new Client({
          user,
          host,
          database: dbName,
          password,
          port,
          ssl:true,
        });
        client.connect();
        return client;
      },
      inject: [config.KEY],
    }],
  exports: ['API_KEY', 'PG'],
})
export class DatabaseModule {}
