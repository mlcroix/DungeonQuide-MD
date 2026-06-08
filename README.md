# Dungeonguide

DungeonGuide started as a homeproject for converting my markdown files into webpages to have an easy way to show my players the lore of the campaign. 

In order to start the project first run npm install to download the dependencies. 

```
npm install
```

After that, you could start the project by running the following command:

```
npm run dev
```


## Prisma
Inside this project, we make use of Primsma for database managment. 
In order to init the database run the following command:

### Create new migration
```
docker compose exec nextjs npx prisma migrate dev --name add_new_feature
```

### Deploy pending migrations
```
docker compose exec nextjs npx prisma migrate deploy
```

### Reset database migrations
```
docker compose exec nextjs npx prisma migrate reset
```