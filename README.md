# NestJS-Typeorm-Multi-Tenancy

Multi Tenancy base example using TypeORM and NestJS

### How to run

1. Execute the docker `docker-compose up -d`;
2. Run once the app `yarn start:dev`
3. Stop the app, and go to the tenant table inside the nestjs-typeorm-multi-tenancy database.
4. Insert the connection data as needed (it will create new database)
5. Use the id to make requests. Inform tenant-id in the headers
