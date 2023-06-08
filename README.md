# Test App for FundraizeUp

## Run Locally

Clone the project

```bash
  git clone https://github.com/VladNagibin/FundraizeUp_test.git
```

Go to the project directory

```bash
  cd my-project FundraizeUp_test
```

Install dependencies

```bash
  yarn install
```

Run mongo ReplicaSet (2 replsets is enough)

Create .env file in root directory and set DB_URI=<mongo_conn_uri>

Start the generator

```bash
  yarn start:generator
```

Start the synchronizer

```bash
  yarn start:sync
```

Start reindexing

```bash
  yarn start:reindex
```

or

```bash
  yarn start:sync --full-reindex
```
