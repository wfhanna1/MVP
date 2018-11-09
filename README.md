# Sclask
Office game score keeping app

## Environment setup
### Database
PostgreSQL must be installed and your database connection information (at this time) must match what is in the `appsettings.Development.json` file.

You must run the following command after setting up your database (within the context of the Sclask folder):
```
dotnet ef database update
```

### Recommended tools
* pgAdmin: Query against the database
* VSCode: The best code editor ever
  * C# extension from Microsoft
  * Debugger for Chrome extension from Microsoft
  * GitLens extension
  * Prettier extension
