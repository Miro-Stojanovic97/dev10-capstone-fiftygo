# Hello, and welcome to Operation Alkemi's most recent Project, FiftyGO!

To run the App, FiftyGO, you will need to:

   1. Open a docker container
   2. Open the file `fiftygo/server/sql/fiftygo-prod.sql` in mySQL Workbench. Run it.
   3. Open the `fiftygo/server` folder in IntelliJ or the like.
      1. Build the project
      2. Run the App.
      3. Possibly reload Maven dependencies if App failed to start.
   4. Open the `fiftygo/client` folder in VSCode or the like.
      1. Open a terminal in this directory (can be in VSCode)
   5. Run `npm install` to install all needed node modules for the app
      1. A window should open automatically with the Application running inside.
   6.  Use the App! :)
       1.  You can ***make your own user account*** (it would only be BASIC-level access unless you contact an administrator or get creative) **or select a default user from the SQL database**:
           1.  jsmith1, an ADMIN-level user (full access to features including viewing a list of all Users)
           2.  jsmith2, a PREMIUM-level user (full access to features, but cannot view all Users)
           3.  jsmith3, a basic USER (limited access to features)
           4.  Hint: "P@ssw0rd!"
   