import { readFile, writeFile } from 'fs/promises';
import { AnyBulkWriteOperation } from 'mongodb';

import { config } from './config';
import { hash, hashEmail } from './helpers';
import { AnonymizedCustomer, Customer, ICustomer } from './models';
import './services/db.service';

let customerPackage: ICustomer[] = [];
let token = '';
async function write(pack?: ICustomer[]) {
  const packageForLoading: ICustomer[] = pack ?? customerPackage;
  if (!packageForLoading.length) return;
  console.log(
    `write>>> loading started with a ${packageForLoading.length} docs package`
  );
  customerPackage = [];
  const anonymizedPackage: AnyBulkWriteOperation<any>[] = packageForLoading.map(
    customer => ({
      replaceOne: {
        filter: { _id: customer._id },
        replacement: new AnonymizedCustomer({
          _id: customer._id,
          firstName: hash(customer.firstName),
          lastName: hash(customer.lastName),
          email: hashEmail(customer.email),
          address: {
            ...customer.address,
            line1: hash(customer.address.line1),
            line2: hash(customer.address.line2),
            postcode: hash(customer.address.postcode),
          },
        }),
        upsert: true,
      },
    })
  );
  !pack &&
    writeFile(config.loadTokenFilePath, token).then(() => {
      console.log('token saved');
    });
  await AnonymizedCustomer.bulkWrite(anonymizedPackage);
}

async function synchronize() {
  setInterval(write, config.timeBetweenLoads);
  try {
    token = await readFile(config.loadTokenFilePath, 'utf-8');
  } catch (e) {
    console.log('no token found');
  }
  const settings: Record<string, Object> = { fullDocument: 'updateLookup' };
  if (token) {
    settings.resumeAfter = { _data: token };
  }
  const changeStream = Customer.watch([], settings);

  changeStream.on('change', ({ _id, fullDocument }) => {
    token = _id._data;
    customerPackage.push(fullDocument);
    if (customerPackage.length >= config.loadPackage) {
      console.log(
        `changeStream>>> loading a ${customerPackage.length} docs package`
      );
      write();
    }
  });
}

async function fullReindex(skip = 0) {
  const customerPackage = await Customer.find({})
    .skip(skip)
    .limit(config.loadPackage);
  await write(customerPackage);
  if (customerPackage.length === config.loadPackage) {
    return fullReindex(skip + config.loadPackage);
  }
  process.exit(0);
}

if (process.argv.includes(config.reindexFlag)) {
  fullReindex();
} else {
  synchronize();
}
