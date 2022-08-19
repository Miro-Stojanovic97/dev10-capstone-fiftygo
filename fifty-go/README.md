# _capstone-operation-alkemi_

---

Capstone project by Operation Alkemi in Dev10 Cohort-27

## Schedule of tasks

* By Friday 8/19:
  * by end of work day: Submit plan and associated planning diagrams
* By Saturday 8/20: 
  * stub layers with empty classes, start filling in models (Alli)
  * create SQL database including mock data and test database with setting known good state (Kelie)
  * start creating React app with Components (Miro)
* By Sunday 8/21:
  * finish models and start data layer (Alli)
  * work on java classes with Alli (Kelie)
  * Have a home page with navbar (Miro)
* By Monday 8/22: 
  * work on data layer(Alli)
  * lay out security package in java (Kelie)
  * implement map view (Miro)
* By Tuesday 8/23: 
  * finish data layer and start testing (Alli)
  * finish security package, help with testing? (Kelie)
  * implement table view for activities with filters (Miro)
* By Wednesday 8/24: 
  * finish data testing and start domain layer (Alli)
  * Work on testing, help finish domain layer, tag team it up (Kelie)
  * implement cards for trips (Miro)
* By Thursday 8/25: 
  * finish domain layer and start testing (Alli)
  * Tag team tasks with Alli (Kelie)
  * create add and edit forms (Miro)
* By Friday 8/26: 
  * finish domain testing and start controller layer (Alli)
  * help with testing or any other loose ends in Java server (Kelie)
  * implement delete function (Miro)
* By Saturday 8/27: 
  * finish controller layer and start testing (Alli)
  * Should get Java Server finished by end of day (everyone)
  * finish up design (html and CSS) of site
* By Sunday 8/28:
  * make sure java, sql, and js are communicating everything correctly (everyone)
  * make sure all correct crud operations work properly (everyone)
* By Monday 8/29: 
  * finding bugs through rigorous testing unhappy path (everyone)
  * showing off app to friends (everyone)
* By Tuesday 8/30: 
  * fixing last minute bugs (everyone)
  * work on presentation (everyone)
* By Wednesday 9/1: 
  * should be all done by end of day!
  * work on / practice presentation (everyone)
* By Thursday 9/2: 
  * crush the presentation!

---
---

## Elevator pitch / core concept
* The problem
  * Not having a good way to organize/plan your travels
* Attention-getter
  * Want to say you've been to all 50 states? FiftyGO will help you get there.
* Why your app is needed
  * America is beautiful, and more people need to go out and experience it. 
* What your app does
  * Allows users to keep track of and plan their national travels while also tracking the activities they did on their trip.
* Restate original problem
  * 
* How your app solves it
  * 

---

# FiftyGO Manager w/ Security
## FiftyGO Data Models

### Activity
    1. activityId               - int
    2. activityDescription      - String
    3. activityDate             - LocalDate
    4. activityPriority         - LocalDate
    5. ActivityDidIt            - boolean
    6. userId                   - int [1-5]

### Trip
    1. tripId           - int
    2. tripDescription  - String
    3. tripStartDate    - LocalDate
    4. tripEndDate      - LocalDate
    5. transportation   - String
    6. TripPriority     - int [1-5]
    7. TripDidIt        - boolean
    8. userId           - int

### Type
    1. typeId   - int
    2. typeName - String

### City
    1. cityId       - int
    2. cityName     - String
    3. stateShort   - String
    4. stateLong    - String
    5. latitude     - BigDecimal?
    6. longitude    - BigDecimal

### User
    1. userId       - int
    2. firstName    - String
    3. lastName     - String
    4. username     - String
    5. passwordHash - hashed password

## Roles
    (no Model in Java Server, only table in SQL db)
    1. roleId   - int
    2. roleName - String
---

    1. Guest/Anonymous Role
    2. Standard User Role
    3. Premium User Role
    4. Administrator Role

## User Stories

    As a __________, I should [not] be able to ____________.

    Preconditions: what must be true for the user story to be relevant.
    Postconditions: what must be true after the user story ends.

* [ ] As a guest, I should not be able to see any trips or activities.
* [ ] As a guest, I should not be able to create a trip or activity.
* [ ] As a guest, I should not be able to remove a trip or activity.
* [ ] As a guest, I should not be able to edit a trip or activity.
* [ ] As a guest, I should be able to create an account.
* [ ] As a guest, I should be able to log into an existing account.
---
* [ ] As a User, I should be able to see _my own_ trips and activities in table view.
* [ ] As a User, I should not be able to see other's trips  or activities.
* [ ] As a User, I should be able to create a trip or activity. (10 trips max, 50 activities max)
* [ ] As a User, I should be able to remove _my own_ trips and activities.
* [ ] As a User, I should not be able to remove other's trips or activities.
* [ ] As a User, I should be able to edit _my own_ trips and activities.
* [ ] As a User, I should not be able to edit other's trips or activities.
---
* [ ] As a Premium User, I should be able to see _my own_ trips and activities in table view.
* [ ] As a Premium User, I should be able to see _my own_ trips and activities in map view.
* [ ] As a Premium User, I should not be able to see other's trips or activities.
* [ ] As a Premium User, I should be able to create a trip or activity. (unlimited amount)
* [ ] As a Premium User, I should be able to remove _my own_ trips and activities.
* [ ] As a Premium User, I should not be able to remove other's trips or activities.
* [ ] As a Premium User, I should be able to edit _my own_ trips and activities.
* [ ] As a Premium User, I should not be able to edit other's trips or activities.
---

* [ ] As an Admin, I should be able to view all users.
* [ ] As an Admin, I should be able to promote a User to Premium User.
* [ ] As an Admin, I should be able to remove Users and Premium Users.
* [ ] As an Admin, I should be able to add Admin role to any other Users.
* [ ] (stretch goal) As an Admin, I should be able to see all trips and activities.
* [ ] (stretch goal) As an Admin, I should be able to create a trip or activity.
* [ ] (stretch goal) As an Admin, I should be able to remove any/all trips and activities.
* [ ] (stretch goal) As an Admin, I should be able to create a city.
---

## Tasks
* [ ] Shift+Alt+F is awesome in VSCode
* [ ] Create Java API
    * [x] Create Java Project (fifty-go-with-security)
    * [x] Modify pom.xml to include the parent tag (spring-boot-starter-parent)
    * [x] Modify pom.xml to include the following dependencies
        * [x] spring-boot-starter-security
        * [x] jjwt-api
        * [x] jjwt-impl
        * [x] jjwt-jackson
        * [x] mysql-connector-java
        * [x] spring-boot-starter-jdbc
        * [x] spring-boot-starter-web
        * [x] spring-boot-starter-validation
      
* [ ] Create base package (fifty-go)
   * [ ] Create App class
       * [ ] @SpringBootApplication
       * [ ] main
           * [ ] SpringApplication.run( App.class, args );
   * [ ] Create application.properties file
   * [ ] spring.datasource.url=jdbc:mysql://localhost:3306/fifty-go_prod
   * [ ] spring.datasource.username=root
   * [ ] spring.datasource.password=top-secret-password
   * [ ] Create models package
     * [ ] Create AppUser class
         * [ ] Extend from the User (org.springframework.security.core.userdetails)
         * [ ] Add Set&lt;String&gt; roles field variable
         * [ ] Add Integer userId field variable
         * [ ] Generate getters/setters
         * [ ] Generate hashCode/equals
         * [ ] Add constructor which takes Integer userId, String username, String password, and Set&lt;String&gt; roles
             * [ ] call super(username, password, roles.stream().map( r -> new SimpleGrantedAuthority( "ROLE_" + r )).collect( Collectors.toList() ) )
             * [ ] assign to this.userId
             * [ ] assign to this.roles
     * [ ] Create Activity class
         * [ ] (See model fields in top of document)
         * [ ] Generate getters/setters
         * [ ] Generate hashCode/equals
     * [ ] Create Trip class
         * [ ] (See model fields in top of document)
         * [ ] Generate getters/setters
         * [ ] Generate hashCode/equals
     * [ ] Create TripType class
         * [ ] (See model fields in top of document)
         * [ ] Generate getters/setters
         * [ ] Generate hashCode/equals
     * [ ] Create City class
         * [ ] (See model fields in top of document)
         * [ ] Generate getters/setters
         * [ ] Generate hashCode/equals
     * [ ] Create User class
         * [ ] (See model fields in top of document)
         * [ ] Generate getters/setters
         * [ ] Generate hashCode/equals
       
   * [ ] Create data package
     * [ ] Create Trip interface
         * [ ] List ;Trip ; findAllPublic()
         * [ ] List ;Trip ; findByUserId(Integer userId)
         * [ ] Trip findById( Integer tripId )
         * [ ] Trip add(Trip toAdd)
         * [ ] boolean remove(Integer tripId)
         * [ ] void edit( Trip updated )
     * [ ] Create TripMapper class
         * [ ] implements RowMapper; Trip;
         * [ ] Generate interface method
             * [ ] Trip toReturn = new Trip();
             * [ ] toReturn.setTripId( rs.getInt("tripId") );
             * [ ] toReturn.setTripDescription( rs.getString("TripDescription"));
             * [ ] toReturn.setUserId( rs.getInt("authorId") );
             * [ ] toReturn.setTripStartDate( LocalDate.parse("tripStartDate"));
             * [ ] toReturn.setTripEndDate( LocalDate.parse("tripEndDate"));
             * [ ] toReturn.setTransportation( rs.getString("transportation"));
             * [ ] to.Return.setPriority( rs.getInt("priority"));
             * [ ] to.Return.setTripDidIt( rs.boolean("TripDidIt"));
             * [ ] return toReturn;
     * [ ] Create TripDbRepo class
         * [ ] Add @Repository
         * [ ] add @Autowired JdbcTemplate template field variable
         * [ ] implements TripRepo
             * [ ] generate functions automatically
             * [ ] implement findAll()
                 * [ ] String sql = "SELECT * FROM trips"
                 * [ ] return template.query( sql, new TripMapper());
             * [ ] implement findById()
                 * [ ] String sql = return template.query("select * from trips where tripId = ?", new TripMapper(), tripId).stream().findAny().orElse(null);
                 * [ ] implement boolean remove(Integer tripId) {
                     * [ ] return template.update( "delete from trips where tripId = ?", tripId) == ?;
                 
         * [ ] Create Activity interface
           * [ ] List ;Activity ; findAllPublic()
           * [ ] List ;Activity ; findByUserId(Integer userId)
           * [ ] Activity findById( Integer activityId )
           * [ ] Activity add(Activity toAdd)
           * [ ] boolean remove(Integer activityId)
           * [ ] void edit( Activity updated )
         * [ ] Create ActivityMapper class
           * [ ] implements RowMapper; Activity;
           * [ ] Generate interface method
               * [ ] Activity toReturn = new Activity();
               * [ ] toReturn.setActivityId( rs.getInt("activityId") );
               * [ ] toReturn.setActivityDescription( rs.getString("ActivityDescription"));
               * [ ] toReturn.setUserId( rs.getInt("userId") );
               * [ ] toReturn.setActivityDate( LocalDate.parse("ActivityDate"));
               * [ ] to.Return.setActivityPriority( rs.getInt("ActivityPriority"));
               * [ ] to.Return.setActivityDidIt( rs.boolean("ActivityDidIt"));
               * [ ] return toReturn;
           * [ ] Create ActivityDbRepo class
               * [ ] Add @Repository
               * [ ] add @Autowired JdbcTemplate template field variable
               * [ ] implements ActivityRepo
                   * [ ] generate functions automatically
                   * [ ] implement findAll()
                       * [ ] String sql = "SELECT * FROM activities"
                       * [ ] return template.query( sql, new ActivityMapper());
                   * [ ] implement findById()
                       * [ ] String sql = return template.query("select * from activities where activityId = ?", new TripMapper(), tripId).stream().findAny().orElse(null);
                       * [ ] implement boolean remove(Integer activityId) {
                           * [ ] return template.update( "delete from activities where activityId = ?", activityId) == ?;
           * [ ] Create UserRepo interface
               * [ ] User findByUsername( String username )
               * [ ] User add( User toAdd )
               * [ ] boolean remove( Integer userId )
               * [ ] void edit( User updated )
           * [ ] Create UserMapper class
               * [ ] create Set&lt;String&gt; roles field variable
               * [ ] create UserMapper constructor which takes in the Set of roles and sets the field variable
               * [ ] implements RowMapper&lt;AppUser&gt;
               * [ ] auto-generate methods
                   * [ ] AppUser toBuild = new AppUser(userId, username, password, roles);
           * [ ] Create UserDbRepository class
               * [ ] Add @Repository 
               * [ ] implements UserRepository
                   * [ ] Add @Autowired JdbcTemplate template field variable
                   * [ ] generate functions automatically
                   * [ ] create private Set&lt;String&gt; findRolesByUsername(String username)
                       * [ ] String sql = "SELECT roleName FROM users u inner join userroles ur on ur.userId = u.userId inner join roles r on ur.roleId = r.roleId where username = ?"
                       * [ ] return template.query( sql, (rowData, rowNum)->rowData.getString("roleName"), username).stream().collect(Collectors.toSet())
                   * [ ] implement findByUsername(String username)
                       * [ ] String sql = "select userId, username, password from users where username = ?"
                       * [ ] return template.query( sql, new UserMapper(findRolesByUsername(username)), username).stream().findAny().orElse(null);
               
   * [ ] Create domain package
     * [ ] Create InvalidUserException
         * [ ] create constructor that takes in String message, call super(message)
         * [ ] create constructor that takes in String message, Throwable innerException calls super( message, innerException )
     * [ ] Create UserService class
         * [ ] mark with @Service
         * [ ] implements UserDetailsService
         * [ ] add UserRepo field variable
         * [ ] add PasswordEncoder field variable
         * [ ] add constructor which takes in a UserRepo & PasswordEncoder
         * [ ] @Override loadUserByUsername (can return AppUser as a UserDetails object)
             * [ ] use the repo to pass along the user
             * [ ] add //TODO: validate (later we'll check to make sure username isn't null/empty/etc)
             * [ ] if user is not found (we get a null) throw new UsernameNotFoundException(username + " not found")
             * [ ] otherwise, return the user
         * [ ] add AppUser create( String username, String password )
             * [ ] for now just return null
     * [ ] Create TripService class
         * [ ] mark as @Service
         * [ ] add @Autowired TripRepo tRepo field variable
         * [ ] add @Autowired ActivityRepo aRepo field variable
         * [ ] add @Autowired UserRepo uRepo field variable
         * [ ] -- should have autogenerated getTrips method from controller --
             * [ ] return repo.findAll();
         * [ ] create public void deleteById(Integer tripId, Principal user) throws InvalidUserException {
             * [ ] Trip toDelete = tripRepo.findById(tripId);
             * [ ] AppUser requester = uRepo.findByUsername(user.getName());
             * [ ] if( requester.getRoles().contains("ADMIN") || requester.getUserId().intValue() == toDelete.getUserId().intValue() ){
                 * [ ] tRepo.remove(tripId);
             * [ ] } else { throw new InvalidUserException("Only admins and the author of the trip may delete it."); }
     * [ ] Create TripService class
         * [ ] mark as @Service
         * [ ] add @Autowired ActivityRepo tRepo field variable
         * [ ] add @Autowired UserRepo uRepo field variable
         * [ ] -- should have autogenerated getActivities method from controller --
             * [ ] return repo.findAll();
         * [ ] create public void deleteById(Integer activityId, Principal user) throws InvalidUserException {
             * [ ] Trip toDelete = activityRepo.findById(activityId);
             * [ ] AppUser requester = uRepo.findByUsername(user.getName());
             * [ ] if( requester.getRoles().contains("ADMIN") || requester.getUserId().intValue() == toDelete.getUserId().intValue() ){
                 * [ ] tRepo.remove(activityId);
             * [ ] } else { throw new InvalidUserException("Only admins and the author of the trip may delete it."); }
           
   * [ ] Create security package
     * [ ] create SecurityConfig class
         * [ ] @EnableWebSecurity
         * [ ] extends WebSecurityConfigurerAdapter
         * [ ] @Override protected void configure( HttpSecurity http) throws Exception
             * [ ] http.csrf().disable()
             * [ ] http.cors()
             * [ ] http.authorizeRequests()
                 * [ ] .antMatchers("/authenticate").permitAll()
                 * [ ] .antMatchers("/create_account").permitAll()
                 * [ ] .antMatchers( HttpMethod.POST, "/api/security/login").permitAll()
                 * [ ] .antMatchers( HttpMethod.GET, "/api/public" ).permitAll()
                 * [ ] .antMatchers( HttpMethod.DELETE, "/api/activity/*").hasAnyRole("AUTHOR", "ADMIN")
                 * [ ] .antMatchers( HttpMethod.DELETE, "/api/trip/*").hasAnyRole("AUTHOR", "ADMIN")
                 * [ ] .antMatchers( HttpMethod.DELETE, "/api/users/*").hasAnyRole("ADMIN")
                 * [ ] .antMatchers("/**").denyAll()
                 * [ ] .and()
                 * [ ] .addFilter(new JwtRequestFilter(authenticationManager(), converter))
                 * [ ] .sessionManagement()
                 * [ ] .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
         * [ ] public PasswordEncoder getEncoder(){ return new BCryptPasswordEncoder(); }
             * [ ] mark with @Bean
         * [ ] @Override protected AuthenticationManager authenticationManager() throws Exception
             * [ ] just return super.authenticationManager();
             * [ ] mark with @Bean
     * [ ] Create JwtConverter class
         * [ ] Mark as @Component
         * [ ] add a Key field variable (secretKey) assign Keys.secretKeyFor(SignatureAlgorithm.HS256)
         * [ ] add public String getTokenFromUser( User toConvert )
             * [ ] generate comma separated string of authorities granted to the user (retrieve those with .getAuthorities() )
             * [ ] return Jwts.builder()
                 * [ ] .setIssuer("fiftygo-app")
                 * [ ] .setSubject(toConvert.getUsername())
                 * [ ] .claim("authorties", commaSeparatedString)
                 * [ ] .setExpiration( new Date(System.currentTimeMillis() + 15 * 60 * 1000 ) )
                 * [ ] .signWithKey( secretKey )
                 * [ ] .compact();
         * [ ] add public User getUserFromToken( String token )
             * [ ] try/catch (JwtException)
                 * [ ] JwtParser parser = Jwts.parserBuilder().requireIssuer("fiftygo-app").setSigningKey( secretKey ).build();
                 * [ ] Jws&lt;Claims&gt; claims = parser.parseClaimsJws( token.substring(7) );
                 * [ ] String username = claims.getBody().getSubject();
                 * [ ] String authorities = (String)claims.getBody().get("authorities");
                 * [ ] String [] authSplit = authorities.split(",");
                 * [ ] List&lt;GrantedAuthority&gt; grantedAuthorities = new ArrayList<>();
                 * [ ] for( String auth : authSplit ){ grantedAuthorities.add(new SimpleGrantedAuthority(auth)); }
                 * [ ] return new User( username, username, grantedAuthorities );
                 * [ ] catch( JwtException ex ) {
                     * [ ] ex.printStackTrace( System.err );
                     * [ ] return null; }
     * [ ] Create JwtRequestFilter class
         * [ ] extends BasicAuthenticationFilter
         * [ ] Add a JwtConverter field
         * [ ] Add a constructor that takes in a JwtConvert and AuthenticationManager
             * [ ] super( authManager )
             * [ ] store the JwtConverter in the field variable
         * [ ] @Override protected void doFilterInternal( HttpServletRequest request, HttpServletResponse response, FilterChain chain)
             * [ ] String authHeader = request.getHeader( "Authorization");
             * [ ] if( authHeader != null && authHeader.startsWith( "Bearer ")){
                 * [ ] User converted = converter.getUserFromToken( authHeader );
                 * [ ] if( converted != null ){
                     * [ ] UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken( converted.getUsername(), null, convertedUser.getAuthorities() );
                     * [ ] SecurityContextHolder.getContext().setAuthentication( token );
                 * [ ] } else {
                     * [ ] response.setStatus( 403 ); }
             * [ ] chain.doFilter( request, response );
         * [ ] IN SecurityConfig.java
             * [ ] add @Autowired JwtConverter field variable
             * [ ] right after the .and() call .addFilter( new JwtReqestFilter() )
           
   * [ ] Create controllers package
     * [ ] Add AuthController class
         * [ ] mark as @RestController
         * [ ] add @RequestMapping( "/api/security" )
         * [ ] add AuthenticationManager field variable
         * [ ] add JwtConverter field variable
         * [ ] add UserService field variable
         * [ ] add a constructor that takes in all field variables and sets them
         * [ ] add ResponseEntity login( @RequestBody Map&lt;String,String&gt; credentials )
             * [ ] mark as @PostMapping("/login")
             * [ ] create UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken( credentials.get("username"), credentials.get("password") );
             * [ ] in a try/catch( AuthenticationException ex) block...
                 * [ ] Authentication authResult = authManager.authenticate( token );
                 * [ ] if( authResult.isAuthenticated() ){
                     * [ ] String jwt = converter.getTokenFromUser( (User)authResult.getPrincipal());
                     * [ ] Map&lt;String,String&gt; tokenWrapper = new HashMap<>();
                     * [ ] tokenWrapper.put( "jwt_token", jwt);
                     * [ ] return ResponseEntity.ok( tokenWrapper );
                 * [ ] }
                 * [ ] catch( AuthenticationException ex ){
                     * [ ] ex.printStackTrace( System.err ); }
                 * [ ] return new ResponseEntity( HttpStatus.FORBIDDEN );
     * [ ] Add ActivityController class
         * [ ] mark as @RestController
         * [ ] @RequestMapping( "/api/activity" )
         * [ ] add @Autowired ActivityService field variable (service)
         * [ ] add a GET endpoint ("/public") for retrieving all activities
             * [ ] List&lt;Activity&gt; pubActivities = service.getPublicActivities() (doesn't exist yet...)
             * [ ] generate ActivityService.getPublicActivities()
             * [ ] return ResponseEntity.ok(pubActivities);
         * [ ] add a DELETE endpoint ("/{activityId}")
             * [ ] public ResponseEntity delete( @PathVariable Integer activityId, Principal user ){
                 * [ ] service.deleteById( activityId, user );
                 * [ ] generate activityService.deleteById()
                 * [ ] return ResponseEntity.ok().build();
     * [ ] Add TripController class
         * [ ] mark as @RestController
         * [ ] @RequestMapping( "/api/trip" )
         * [ ] add @Autowired TripService field variable (service)
         * [ ] add a GET endpoint ("/public") for retrieving all Trips
             * [ ] List&lt;Trip&gt; pubTrips = service.getPublicTrips() (doesn't exist yet...)
             * [ ] generate TripService.getPublicTrips()
             * [ ] return ResponseEntity.ok(pubTrips);
         * [ ] add a DELETE endpoint ("/{tripId}")
             * [ ] public ResponseEntity delete( @PathVariable Integer tripId, Principal user ){
                 * [ ] service.deleteById( tripId, user );
                 * [ ] generate tripService.deleteById()
                 * [ ] return ResponseEntity.ok().build();
     * [ ] Add CityController class **(stretch goal)**
         * [ ] mark as @RestController
         * [ ] @RequestMapping( "/api/city" )
         * [ ] add @Autowired CityService field variable (service)
         * [ ] add a GET endpoint ("/public") for retrieving all Cities
             * [ ] List&lt;City&gt; pubCities = service.getPublicCities() (doesn't exist yet...)
             * [ ] generate CityService.getPublicCities()
             * [ ] return ResponseEntity.ok(pubCities);
         * [ ] add a DELETE endpoint ("/{cityId}")
             * [ ] public ResponseEntity delete( @PathVariable Integer cityId, Principal user ){
                 * [ ] service.deleteById( cityId, user );
                 * [ ] generate cityService.deleteById()
                 * [ ] return ResponseEntity.ok().build();
     * [ ] Add UserController class
         * [ ] mark as @RestController
         * [ ] @RequestMapping( "/api/user" )
         * [ ] add @Autowired UserService field variable (service)
         * [ ] add a GET endpoint ("/public") for retrieving all Users 
             * [ ] List&lt;User&gt; pubUsers = service.getPublicUsers() (doesn't exist yet...)
             * [ ] generate UserService.getPublicUsers()
             * [ ] return ResponseEntity.ok(pubUsers);
         * [ ] add a DELETE endpoint ("/{userId}")
             * [ ] public ResponseEntity delete( @PathVariable Integer userId, Principal user ){
                 * [ ] service.deleteById( userId, user );
                 * [ ] generate userService.deleteById()
                 * [ ] return ResponseEntity.ok().build();
                     
   * [ ] Create mysql schemas (test/prod)
       * [ ] create sql folder in project folder
       * [ ] create fiftygo-test.sql
       * [ ] create fiftygo-prod.sql
       * [ ] drop database if exists fiftygo_X
       * [ ] create database fiftygo_X
       * [ ] use fiftygo_X
       * [ ] create table users
           * [ ] userId        int primary key auto_increment
           * [ ] username      varchar(300) not null unique
           * [ ] password      varchar(2048) not null,
       
       * [ ] create table todos
           * [ ] todoId        int primary key auto_increment
           * [ ] todoText      text not null
           * [ ] authorId      int not null
           * [ ] isPublic      bit(1) not null
           * [ ] createDate    date not null
           * [ ] constraint fk_todos_users foreign key (authorId) references users(userId)
     
       * [ ] create table todos
           * [ ] todoId        int primary key auto_increment
           * [ ] todoText      text not null
           * [ ] authorId      int not null
           * [ ] isPublic      bit(1) not null
           * [ ] createDate    date not null
           * [ ] constraint fk_todos_users foreign key (authorId) references users(userId)

       * [ ] create table todos
           * [ ] todoId        int primary key auto_increment
           * [ ] todoText      text not null
           * [ ] authorId      int not null
           * [ ] isPublic      bit(1) not null
           * [ ] createDate    date not null
           * [ ] constraint fk_todos_users foreign key (authorId) references users(userId)

       * [ ] create table todos
           * [ ] todoId        int primary key auto_increment
           * [ ] todoText      text not null
           * [ ] authorId      int not null
           * [ ] isPublic      bit(1) not null
           * [ ] createDate    date not null
           * [ ] constraint fk_todos_users foreign key (authorId) references users(userId)
     
       * [ ] create table roles
          * [ ] roleId        int primay key auto_increment
          * [ ] roleName      varchar(20) not null unique
       
       * [ ] create table userroles
           * [ ] userId        int not null,
           * [ ] roleId        int not null,
           * [ ] constraint pk_userroles (userId, roleId),
           * [ ] constraint fk_users_userroles foreign key (userId) references users(userId)
           * [ ] constraint fk_roles_userroles foreign key (roleId) references roles(roleId)
           * [ ] insert into users (username, password) values ('bob', '$2a$12$HqaU3VlN09ufZ60R8VrLHuIX8H6b1iFDA9AG./vzThpIzhxEIF8nC');   -- pw is password
           * [ ] insert into users (username, password) values ('june', '$2a$12$k2TB.cQ1TLHLOYn.pbbiTuQ5HoUxozWkl.ZgFZ.9eioAeMxndT5AS');  -- pw is admin-password
           * [ ] insert into roles (roleName) VALUES ('AUTHOR'), ('ADMIN');
           * [ ] insert into userroles (userId, roleId) VALUES (1,1), (2,2);
           * [ ] insert into todos (todoText, authorId, isPublic, createDate) values ('this is a private todo', 1, 0, '2020-04-06'), ('this is a public todo', 2, 1, '2020-04-05');
           * [ ] generate reset stored procedure in db (set_known_good_state)
               * [ ] delete from userroles;
               * [ ] delete from users;
               * [ ] alter table users auto_increment = 1;
               * [ ] delete from roles;
               * [ ] alter table roles auto_increment = 1;
               * [ ] delete from todos;
               * [ ] alter table todos auto_increment = 1;
               * [ ] (copy all inserts from prod)
           * [ ] at end of test schema call set_known_good_state();

   * [ ] Create React Front-End
       * [ ] From the terminal, inside of your Java application
           * [ ] `npx create-react-app client`
           * [ ] `cd client`
           * [ ] `code .` [optional - open in VSCode]
       * [ ] Delete cruft
           * [ ] ./public/favicon.ico
           * [ ] ./public/logo192.png
           * [ ] ./public/logo512.png
           * [ ] ./public/manifest.json
           * [ ] ./public/robots.txt
           * [ ] ./src/App.css
           * [ ] ./src/App.test.js
           * [ ] ./src/logo.svg
           * [ ] ./src/reportWebVitals.js
           * [ ] ./src/setupTests.js
           * [ ] Update ./public/index.html
               * [ ] From default file, delete:
                   * [ ] Lines 4-26
                   * [ ] Change Title to `FiftyGO`
                   * [ ] Delete any additional comments here
           * [ ] Update ./src/App.js
               * [ ] From default file, delete:
                   * [ ] Lines 7-20
                   * [ ] Lines 1-2
           * [ ] Update ./src/index.css\
               * [ ] Trashcan it all
           * [ ] Update ./src/index.js
           * [ ] From default file, delete:
               * [ ] Lines 14-17
               * [ ] Lines 5
       * [ ] Add additional dependencies
           * [ ] `npm i react-router-dom `
       * [ ] Create components (indents below indicate parent-child relations)
           * [ ] Nav Component
           * [ ] Login Component
           * [ ] Home Component - welcoming and showing all pub todos
               * [ ] Welcome Component - nested inside Home
               * [ ] Todos (container) Component
                   * [ ] Todo Component
                   * [ ] Delete Component
           * [ ] AddTodo Component
       * [ ] Add react-router to our project
           * [ ] At the top of index.js
               * [ ] `import { BrowserRouter } from 'react-router-dom';`
               * [ ] Change `<React.StrictMode>` to `<BrowserRouter>`
               * [ ] Change `</React.StrictMode>` to `</BrowserRouter>`
       * [ ] Build out base Home component
           * [ ] Functional component, don't forget to export!
       * [ ] Build out base Welcome component
           * [ ] Functional component, don't forget to export!
       * [ ] Add `<Home />` to App.js
           * [ ] `import Home from "./Home";`
           * [ ] Add flavor-text to ground ourselves
       * [ ] Add `<Welcome />` to Home.js
           * [ ] `import Welcome from "./Welcome";`
           * [ ] Add flavor-text to ground ourselves
       * [ ] Add `<Nav />` to App.js
           * [ ] `import Nav from "./Nav";`
           * [ ] Add flavor-text to ground ourselves
       * [ ] Begin implementing Routes in App.js
           * [ ] `import { Routes, Route } from 'react-router-dom';`
           * [ ] `<Routes>`
               * [ ] `<Route path="/" element={<Home />} />`
               * [ ] `// ^^ Home Page Route, at base dot-com URL`
           * [ ] `</Routes>`
       * [ ] Begin implementing Links in Nav.js
           * [ ] `import { Link } from 'react-router-dom';`
           * [ ] `<Link to="/">Home</Link>`
       * [ ] Add `<Todos />` component to Home.js
           * [ ] `import Todos from "./Todos";`
       * [ ] In Trips.js...
           * [ ] Create State to store public todos
               * [ ] `import { useState } from 'react';`
                   * [ ] `const [pubTodos, setPubTodos] = useState([]);`
           * [ ] Implement `useEffect()` hook for setting state on fetch
               * [ ] `import { useState, useEffect } from 'react';`
               * [ ] `useEffect(() => {`
                   * [ ] Use Fetch API to retrieve our public todos
                       * [ ] Verify CORS is open in your TodoController (Java)
                           * [ ] `@CrossOrigin(origins = {"http://localhost:3000"})`
                       * [ ] `fetch("http://localhost:8080/api/todo/public")`
                       * [ ] `.then(response => {`
                           * [ ] `if (response.status === 200) {`
                               * [ ] `return response.json() `
                           * [ ] `} else {`
                               * [ ] `alert("Something went wrong when fetching")`
                           * [ ] `}`
                       * [ ] `})`
                       * [ ] `.then(todosData => setPubTodos(todosData))`
                       * [ ] `.catch(rejection => alert("Failure: " + rejection.status))`
               * [ ] `}, [])`
           * [ ] `import Trip from './Trip'`
           * [ ] Implement a `<Trip />` factory function
               * [ ] `function TripFactory() {`
                   * [ ] `return pubTrip.map(trip => <Trip key={trip.tripId} tripObj={trip} />);`
               * [ ] `}`
               * [ ] Call function inside of the return for `<Trip />`
                   * [ ] `return (`
                       * [ ] `<>`
                           * [ ] `{tripFactory()}`
                       * [ ] `</>`
                   * [ ] `)`
           * [ ] Build out the base `<Todo />` component
               * [ ] Functional component, don't forget to export
           * [ ] Use `props.todoObj` to access the todo and display in Todo.js
               * [ ] Destructure the properties of my todoObj into variables
                   * [ ] const { text, userId, createDate } = props.todoObj;
                   * [ ] Build HTML/JSX structure to display data to return
                       * [ ] `<div className="todo-item">`
                           * [ ] `<h3>User Id: {userId}</h3>`
                           * [ ] `<p>Created: {createDate}</p>`
                           * [ ] `<p>Text: {text}</p>`
                       * [ ] `</div>`
           * [ ] Update index.css with Dev-CSS to help visualize
               * [ ] `.todo-item { `
                   * [ ] `border: 1px black solid;`
                   * [ ] `padding: 20px;`
                   * [ ] `margin-bottom: 30px;`
               * [ ] `}`
       * [ ] Implement useContext hook
           * [ ] Create AuthContext.js
               * [ ] import { createContext } from 'react';
               * [ ] const AuthContext = createContext();
               * [ ] export default AuthContext
       * [ ] In App.js, implement Context
           * [ ] `import { useState } from 'react';`
           * [ ] `import AuthContext from "./AuthContext";`
           * [ ] `const [user, setUser] = useState(null);`
           * [ ] Inside of the return
               * [ ] Before rendering any other components, encapusulate with:
                   * [ ] `<AuthContext.Provider value={[user, setUser]}>`
                       * [ ] `(everything else you already had here)`
                   * [ ] `</AuthContext.Provider>`
       * [ ] Verify CORS is handled in AuthController (Java)
           * [ ] `@CrossOrigin(origins = {"http://localhost:3000"})`
       * [ ] Build out Login component
           * [ ] In terminal: `npm i jwt-decode`
           * [ ] `import { useState, useContext } from "react";`
           * [ ] `import { useNavigate } from "react-router-dom";`
           * [ ] `import jwtDecode from "jwt-decode";`
           * [ ] `import AuthContext from "./AuthContext";`
           * [ ] const [username, setUsername] = useState("");
           * [ ] const [password, setPassword] = useState("");
           * [ ] const [user, setUser] = useContext(AuthContext);
           * [ ] const navigate = useNavigate();
           * [ ] Build out a form for logging in
               * [ ] `<form onSubmit={submitHandler}>`
                   * [ ] `<label>Username:</label><br />`
                   * [ ] `<input onChange={event => setUsername(event.target.value)}></input><br /><br />`
                   * [ ] `<label>Password:</label><br />`
                   * [ ] `<input type="password" onChange={event => setPassword(event.target.value)}></input><br /><br />`
                   * [ ] `<button>Submit</button>`
               * [ ] `</form>`
           * Create submit handler for form
               * [ ] `function submitHandler(event) {`
                   * [ ] `event.preventDefault()`
                   * [ ] `fetch("http://localhost:8080/api/security/login", {`
                       * [ ] `method: "POST",`
                       * [ ] `headers: {`
                           * [ ] `"Content-Type": "application/json"`
                       * [ ] ` },`
                       * [ ] `body: JSON.stringify({`
                           * [ ] `username, password`
                       * [ ] `})`
                   * [ ] `})`
                   * [ ] `.then(response => {`
                       * [ ] `if (response.status === 200) {`
                           * [ ] `const { jwt_token } = response.json()`
                           * [ ] `localStorage.setItem("token", jwt_token)`
                           * [ ] `setUser({user: jwtDecode(jwt_token)})`
                           * [ ] `navigate("/")`
                       * [ ] `} else {`
                           * [ ] `alert("Something bad");`
                       * [ ] `}`
                   * [ ] `})`
                   * [ ] `.catch(rejection => alert(rejection))`
               * [ ] `}`
           * [ ] Update App.js with new Login route
               * [ ] `import Login from "./Login";`
               * [ ] `<Route path="/login" element={<Login />} />`
           * [ ] Update Nav.js with new Login link
               * [ ] `import { useConte  xt } from 'react';`
               * [ ] `import AuthContext from './AuthContext';`
               * [ ] `const [userStatus, setUserStatus] = useContext(AuthContext);`
  