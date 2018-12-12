JavaScript Mongodb BulkWrite Demo
=================================

Demonstrate with `bulkWrite'

```
brew install mongodb
brew services start mongodb
```

CRUD of mongodb:

```
npm install
npm run demo
```

Current Problem is when I have both `insertOne` and `updateOne` in `bulkWrite`, the result will be very strange:

```
------- clearDb --------
------- createUsers --------
------- printUsers --------
{ _id: 5c10b6011dd87efa7feb5b47, name: 'javascript', age: 10 }
{ _id: 5c10b6011dd87efa7feb5b48, name: 'mongodb', age: 20 }
------- bulkWrite --------
------- printUsers --------
{ _id: 5c10b6011dd87efa7feb5b47 }
{ _id: 5c10b6011dd87efa7feb5b48, name: 'mongodb', age: 20 }
```

I expect the result of last part to be:

```
{ _id: 5c10b6011dd87efa7feb5b47, name: 'javascript', age: 10 }
{ _id: 5c10b6011dd87efa7feb5b48, name: 'mongodb', age: 20 }
{ _id: 5c10b6011dd87efa7feb5b49, name: 'bulk-insert1', age: 100 }
```
