# NestJS-Typeorm-Multi-Tenancy

Multi Tenancy base example using TypeORM and NestJS

### How to run

1. Rename .env.example to .env
2. Execute the docker `docker-compose up -d`;
3. Run once the app `yarn start:dev`
4. Stop the app, and go to the tenant table inside the nestjs-typeorm-multi-tenancy database.
5. Insert the connection data as needed (it will create new database)
6. Use the id to make requests. Inform tenant-id in the headers

### Commands

If you want to generate migrations based on the entities, you can do it by running `yarn typeorm:generate`, then, when you start the application, it will run the migrations for all bases.
