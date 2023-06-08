import 'dotenv/config';

export const config = {
  connectionUri: process.env.DB_URI,
  maximumGeneratedDocuments: 10,
  timeBetweenGenerating: 200,
  hashLength: 8,
  timeBetweenLoads: 1000,
  loadPackage: 1000,
  loadTokenFilePath: 'src/token',
  reindexFlag: '--full-reindex',
};
