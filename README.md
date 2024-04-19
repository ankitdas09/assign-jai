### Folder Structure

* ```/api``` : Backend for the application
* ```/common``` : Contains shared logic for frotend app and backend, eg: Validation Logic
* ```/web``` : Frontend application

Note: Please use ** yarn ** to run the frontend application.

### Running locally

Backend
```
cd api
npm install
npm run build
npm start
```

Frontend
```
cd web
yarn
yarn dev
```

### Environment Variables

```/api/.env``` requires MONGO_URI. Recommended to use Atlas (as it has been used in development and testing).


### Notes

Currently the backend can handle audio files upto 16MB. Above 16MB bugs may arise. (Sorry, was busy with academics didn't get enough time to implement MongoDB file storage featues.)

### Stack Used

* Typescript
* Express.js
* MongoDB
* React
* TailwindCSS
* ShadCn for UI components