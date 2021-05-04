import {createPool, Pool} from 'mysql2/promise';

export const connect=async () :Promise<Pool>=> {
  return createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'project_box_pro',
  });
};
