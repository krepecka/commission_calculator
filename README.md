# commission_calculator
The idea is that the application should be fully configurable through the API calls for limits and percentages.

commissionCalculator fully adheres to this approach and it won't have to be changed until business requirements change. However, the weak point at the moment is the ratesAndLimits service which is tightly coupled with the API calls. This service should actually perform 4 calls: 
- normal cash in
- normal cash out
- legal cash in
- legal cash out

and map weekly_limit, max, min values for all of person type and operation type combinations.

## Running the application
```
npm i
npm start input.json
```

## Unit tests

There's just a few dummy tests. Extensive unit testing was postponed.

The most important part to cover is **commissionCalculator**
