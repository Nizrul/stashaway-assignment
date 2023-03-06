# StashAway assignment

## How to start

1. Run yarn install to install the dependencies
2. Run yarn dev to build and start the application
3. More scripts are available in the package.json, e.g. yarn test will run the tests

## Setup

- PORT can be setup in the .env (or secrets for repl.it), value would default to 3000

## Endpoints

- `GET /` will return a test string, to verify that the application is up and reachable
- `POST /portfolios/simulate` will accept a body containing `depositPlans` and `fundDeposits` (refer to [sample json](./sample.json))
  - There is validation on both the deposit plans and fund deposits, whereby an array with a minimum of size 1 will be accepted for both, and unique content checks are done on deposit plans

## Explanation

- Logic:
  - There are no priorities for any deposit plans, therefore we'll just consider all of them equal and distribution will be done based on the overall ratio of deposit plan allocation amount
  - Excess or allocation amount below the deposit plans' allocation amount will be adjusted based on the same ratio
  - decimal.js was used to ensure rounding accuracy, however, it was added after the fact, thus implementation might be a bit messy
- Prisma was added but not currently actually used in the project
  - Data modelled in prisma are based on how it would be handled in the expected 'real-world' scenario
  - There can be multiple customers (auth not included), each potentially creating multiple portfolios, each of which would have deposit plans related to each other in a M:N relation and customers could also create fund deposits
    - For deposit plans, there can only be one deposit plan active per type, therefore, if a deposit plan has been created and is still active of type 'one-time', no more 'one-time' deposit plans can be created for this customer, but it can be updated until it is deactivated
  - Fund deposits can be added without limitation by the customer
    - The expectation is that there is a cycling processing for the fund deposits and deposit plans, whereby all the active deposit plans and fund deposits will be processed at once per cycle, fund deposits will be marked as 'used' once the `allocatedDate` is not null
  - These flow are not currently included in the project as they might be out of scope for the system, thus were not developed yet
