import { faker } from '@faker-js/faker';

import { Customer, ICustomer } from './models';
import { getRandomInt } from './helpers';
import { config } from './config';

import './services/db.service';

const generate = async () => {
  const amountOfDocuments = getRandomInt(config.maximumGeneratedDocuments);
  const documents: Promise<ICustomer>[] = [];
  for (let i = 0; i < amountOfDocuments; i++) {
    documents.push(
      new Customer({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        address: {
          line1: faker.location.streetAddress(),
          line2: faker.location.secondaryAddress(),
          postcode: faker.location.zipCode(),
          city: faker.location.city(),
          state: faker.location.state(),
          country: faker.location.country(),
        },
      }).save()
    );
  }
  await Promise.all(documents);
  console.log(`generate>>> generated ${amountOfDocuments} documents`);
};

setInterval(generate, config.timeBetweenGenerating);
