### .env file example is attached

### To start server in prod - type "npm run start" in terminal window
### To start server in dev - type "npm run dev" in terminal window
### To generate sql (migrations folder) type "npm run generate-sql" in terminal window, then use pure sql to create table in DB
#
### Endpoints description:
#
### [GET] /cards - used to get a list of all cards 
### body: none
#### if no cards - server will return empty array
#
### [GET] /cards/:id - used to get card by ID 
### body: none
#### if no card - server will 404 status code + message
#### if ok - server will return JSON object with card info
#
### [POST] /cards - used to create new card
#### body: JSON
```json
{
    "id": 10, // optional, type: number
    "name": "Hello", // required, type: string
    "ownerID": 1,   // required, type: number
    "type": "Gold" // required, type: string from array - [ "Gold", "Silver", "Iron", "Composite"]
}
```
#### if card is exist - server will send 400 status code + message
#### if ok - server will return JSON object with new card info
#
### [PUT] /cards/:id - used to update card info
#### body: JSON
```json
{
    "id": 10, // optional, type: number
    "name": "Hello", // required, type: string
    "ownerID": 1,   // required, type: number
    "type": "Gold" // required, type: string from array - [ "Gold", "Silver", "Iron", "Composite"]
}
```
#### if card is not exist - server will return 400 status code + message
#### if ok - server will return JSON object with new card
 info
#
### [DELETE] /cards/:id - used to delete card by id
#### body: none
#### if card is not exist - server will return 400 status code + message
#### if ok - server will return JSON object with deleted card
#
