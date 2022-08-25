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
  * work on data layer, troubleshoot db connectivity issue, afterhours: finish Pin and City repos and testing (Kelie)
  * implement map view (Miro)
* By Tuesday 8/23: 
  * finish data layer and start testing (Alli)
  * finish security package, help with testing? (Kelie)
  * implement table view for pins with filters (Miro)
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
  * finalize functionality of react front-end (Miro)
* By Sunday 8/28:
  * make sure java, sql, and js are communicating everything correctly (everyone)
  * make sure all correct crud operations work properly (everyone)
  * finishing touches on front-end, design (html and CSS) of site (Miro)
* By Monday 8/29: 
  * finding bugs through rigorous testing unhappy path (everyone)
  * showing off app to friends (everyone)
  * finish up design (html and CSS) of site (everyone)
* By Tuesday 8/30: 
  * fixing last minute bugs (everyone)
  * finish up design (html and CSS) of site (everyone)
* By Wednesday 8/31:
  * fixing last minute bugs (everyone)
  * finish up design (html and CSS) of site (everyone)
  * work on / practice presentation (everyone)
* By Thursday 9/1: 
  * should be all done by end of day!
  * work on / practice presentation (everyone)
* By Friday 9/2: 
  * crush the presentation!

---
---

## Elevator pitch / core concept
  * A problem a lot of travelers have is not being able to keep track of their planned travels.
If someone has multiple trips planned, it would be convenient to see all of their trips in one place.
FiftyGO can help you keep track of your plans while encouraging you to travel more with our "map view" of your trips.
America is beautiful and more people should go out and experience all it has to offer. 
FiftyGO allows users to keep track of and plan their national travels while also tracking the activities they have planed for their trip.
Without an organized place to view your planned trips and activities, your trips can get hectic and overwhelming trying to fit everything in.
FiftyGO is here to supply a safe place for your plans so you can spend your trip enjoying the beauty instead of worrying about if you can see it.

<<<<<<< HEAD
    
# TODO Manager w/ Security
=======
---
>>>>>>> 73a2ccbd675959691335182ef9aee6edb51c0c35

# FiftyGO Manager w/ Security
## FiftyGO Data Models

### Pin (formerly known as activity)
    1. pinId               - int
    2. pinDescription      - String
    3. pinDate             - LocalDate
    4. pinPriority         - int [1-5]
    5. pinDidIt            - boolean
    6. userId              - int

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
    6. disabled     - boolean

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
      
* [x] Create base package (fifty-go)
   * [x] Create App class
       * [x] @SpringBootApplication
       * [x] main
           * [x] SpringApplication.run( App.class, args );
   * [x] Create application.properties file
   * [x] spring.datasource.url=jdbc:mysql://localhost:3306/fifty-go_prod
   * [x] spring.datasource.username=root
   * [x] spring.datasource.password=top-secret-password
   * [x] Create models package
     * [x] Create AppUser class
         * [x] Extend from the User (org.springframework.security.core.userdetails)
         * [x] Add Set&lt;String&gt; roles field variable
         * [x] Add Integer userId field variable
         * [x] Generate getters/setters
         * [x] Generate hashCode/equals
         * [x] Add constructor which takes Integer userId, String username, String password, and Set&lt;String&gt; roles
             * [x] call super(username, password, roles.stream().map( r -> new SimpleGrantedAuthority( "ROLE_" + r )).collect( Collectors.toList() ) )
             * [x] assign to this.userId
             * [x] assign to this.roles
     * [x] Create Activity class
         * [x] (See model fields in top of document)
         * [x] Generate getters/setters
         * [x] Generate hashCode/equals
     * [x] Create Trip class
         * [x] (See model fields in top of document)
         * [x] Generate getters/setters
         * [x] Generate hashCode/equals
     * [x] Create TripType class
         * [x] (See model fields in top of document)
         * [x] Generate getters/setters
         * [x] Generate hashCode/equals
     * [x] Create City class
         * [x] (See model fields in top of document)
         * [x] Generate getters/setters
         * [x] Generate hashCode/equals
     * [x] Create AppUser class
         * [x] (See model fields in top of document)
         * [x] Generate getters/setters
         * [x] Generate hashCode/equals
       
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
           * [x] List ;Activity ; findAllPublic()
           * [x] List ;Activity ; findByUserId(Integer userId)
           * [x] Activity findById( Integer activityId )
           * [x] Activity add(Activity toAdd)
           * [x] boolean remove(Integer activityId)
           * [x] void edit( Activity updated )
         * [x] Create ActivityMapper class
           * [x] implements RowMapper; Activity;
           * [x] Generate interface method
               * [x] Activity toReturn = new Activity();
               * [x] toReturn.setActivityId( rs.getInt("activityId") );
               * [x] toReturn.setActivityDescription( rs.getString("ActivityDescription"));
               * [x] toReturn.setUserId( rs.getInt("userId") );
               * [x] toReturn.setActivityDate( LocalDate.parse("ActivityDate"));
               * [x] to.Return.setActivityPriority( rs.getInt("ActivityPriority"));
               * [x] to.Return.setActivityDidIt( rs.boolean("ActivityDidIt"));
               * [x] return toReturn;
           * [x] Create ActivityDbRepo class
               * [x] Add @Repository
               * [x] add @Autowired JdbcTemplate template field variable
               * [x] implements ActivityRepo
                   * [x] generate functions automatically
                   * [x] implement findAll()
                       * [x] String sql = "SELECT * FROM activities"
                       * [x] return template.query( sql, new ActivityMapper());
                   * [x] implement findById()
                       * [x] String sql = return template.query("select * from activities where activityId = ?", new TripMapper(), tripId).stream().findAny().orElse(null);
                       * [x] implement boolean remove(Integer activityId) {
                           * [x] return template.update( "delete from activities where activityId = ?", activityId) == ?;
           * [x] Create UserRepo interface
               * [x] User findByUsername( String username )
               * [x] User add( User toAdd )
               * [ ] boolean remove( Integer userId )
               * [ ] void edit( User updated )
           * [x] Create UserMapper class
               * [x] create Set&lt;String&gt; roles field variable
               * [x] create UserMapper constructor which takes in the Set of roles and sets the field variable
               * [x] implements RowMapper&lt;AppUser&gt;
               * [x] auto-generate methods
                   * [x] AppUser toBuild = new AppUser(userId, username, password, roles);
           * [x] Create UserDbRepository class
               * [x] Add @Repository 
               * [x] implements UserRepository
                   * [x] Add @Autowired JdbcTemplate template field variable
                   * [x] generate functions automatically
                   * [x] create private Set&lt;String&gt; findRolesByUsername(String username)
                       * [x] String sql = "SELECT roleName FROM users u inner join userroles ur on ur.userId = u.userId inner join roles r on ur.roleId = r.roleId where username = ?"
                       * [x] return template.query( sql, (rowData, rowNum)->rowData.getString("roleName"), username).stream().collect(Collectors.toSet())
                   * [x] implement findByUsername(String username)
                       * [x] String sql = "select userId, username, password from users where username = ?"
                       * [x] return template.query( sql, new UserMapper(findRolesByUsername(username)), username).stream().findAny().orElse(null);
               
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
           
   * [x] Create security package
     * [x] create SecurityConfig class
         * [x] @EnableWebSecurity
         * [x] extends WebSecurityConfigurerAdapter
         * [x] @Override protected void configure( HttpSecurity http) throws Exception
             * [x] http.csrf().disable()
             * [x] http.cors()
             * [x] http.authorizeRequests()
                 * [x] .antMatchers("/authenticate").permitAll()
                 * [x] .antMatchers("/create_account").permitAll()
                 * [x] .antMatchers( HttpMethod.POST, "/api/security/login").permitAll()
                 * [x] .antMatchers( HttpMethod.GET, "/api/public" ).permitAll()
                 * [x] .antMatchers( HttpMethod.DELETE, "/api/activity/*").hasAnyRole("AUTHOR", "ADMIN")
                 * [x] .antMatchers( HttpMethod.DELETE, "/api/trip/*").hasAnyRole("AUTHOR", "ADMIN")
                 * [x] .antMatchers( HttpMethod.DELETE, "/api/users/*").hasAnyRole("ADMIN")
                 * [x] .antMatchers("/**").denyAll()
                 * [x] .and()
                 * [x] .addFilter(new JwtRequestFilter(authenticationManager(), converter))
                 * [x] .sessionManagement()
                 * [x] .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
         * [x] public PasswordEncoder getEncoder(){ return new BCryptPasswordEncoder(); }
             * [x] mark with @Bean
         * [x] @Override protected AuthenticationManager authenticationManager() throws Exception
             * [x] just return super.authenticationManager();
             * [x] mark with @Bean
     * [ ] Create JwtConverter class
         * [x] Mark as @Component
         * [x] add a Key field variable (secretKey) assign Keys.secretKeyFor(SignatureAlgorithm.HS256)
         * [x] add public String getTokenFromUser( User toConvert )
             * [x] generate comma separated string of authorities granted to the user (retrieve those with .getAuthorities() )
             * [x] return Jwts.builder()
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
       * [x] create sql folder in project folder
       * [x] create fiftygo-test.sql
       * [x] create fiftygo-prod.sql
       * [x] drop database if exists fiftygo_X
       * [x] create database fiftygo_X
       * [x] use fiftygo_X

       * [x] create table user
           * [x] user_id        int primary key auto_increment
           * [x] first_name     varchar(50) not null
           * [x] last_name      varchar(50) not null
           * [x] username       varchar(50) not null unique
           * [x] password_hash  varchar(2048) not null
           * [x] disabled       bit not null default (0)
         
       * [x] create table pin (formerly known as activity)
           * [x] pin_id             int primary key auto_increment
           * [x] pin_description    varchar(300) not null
           * [x] pin_date           date null
           * [x] pin_priority       int not null
           * [x] pin_did_it         bit not null
           * [x] user_id            int not null 
           * [x] constraint fk_pin_user_id foreign key (user_id) references user(user_id)
     
       * [x] create table trip
           * [x] trip_id            int primary key auto_increment
           * [x] trip_description   varchar(300) not null
           * [x] trip_start_date    date null
           * [x] trip_end_date      date null
           * [x] transportation     varchar(50) not null
           * [x] trip_priority      int not null
           * [x] trip_did_it        bit not null
           * [x] user_id            int not null
           * [x] constraint fk_trip_user_id foreign key (user_id) references user(user_id)

       * [x] create table type
           * [x] type_id        int primary key auto_increment
           * [x] type_name      varchar(50) not null

       * [x] create table role
           * [x] role_id        int primary key auto_increment
           * [x] role_name      varchar(20) not null unique
       
       * [x] create table user_role
           * [x] user_id        int not null,
           * [x] role_id        int not null,
           * [x] constraint pk_user_role (userId, roleId),
           * [x] constraint fk_user_role_user_id foreign key (userId) references user(userId)
           * [x] constraint fk_user_role_role_id foreign key (roleId) references roles(roleId)
         
       * [ ] insert data into tables for test db:
         * [x] insert into user (first_name, last_name, username, password, disabled) values ('bob', '$2a$12$HqaU3VlN09ufZ60R8VrLHuIX8H6b1iFDA9AG./vzThpIzhxEIF8nC');   -- pw is password
         * [x] insert into role (role_name) VALUES ('USER'), ('PREMIUM'), ('ADMIN');
         * [x] insert into user_role (userId, roleId) VALUES (1,1), (2,2);
         * [x] insert into city (city_id, city_name, state_short, state_long, city_latitude, city_longitude)
         * [x] insert into pin (pin_description, pin_date, pin_priority, pin_did_it, user_id) values (...);
         * [x] insert into trip (trip_description, trip_start_date, trip_end_date, transportation, trip_priority, trip_did_it, user_id) values (...);
         * [x] insert into type (type_name) values (...);
         * [x] insert into pin_type (pin_id, type_id) values (...);
         * [x] insert into pin_city (pin_id, city_id) values (...);
         * [x] insert into pin_trip (pin_id, trip_id) values (...);
         * [x] generate reset stored procedure in db (set_known_good_state)
             * [x] delete from pin_trip;
             * [x] delete from pin_city;
             * [x] delete from pin_type;
             * [x] delete from type;
             * [x] alter table type auto_increment = 1;
             * [x] delete from trip;
             * [x] alter table type auto_increment = 1;
             * [x] delete from pin;
             * [x] alter table type auto_increment = 1;
             * [x] delete from user_role;
             * [x] delete from user;
             * [x] alter table user auto_increment = 1;
             * [x] delete from role;
             * [x] alter table role auto_increment = 1;
             * [x] (copy all inserts from prod)
         * [x] at end of test schema call set_known_good_state();

   * [ ] Create React Front-End
       * [ ] From the terminal, inside of your Java application
           * [x] `npx create-react-app client`
           * [x] `cd client`
           * [x] `code .` [optional - open in VSCode]
       * [ ] Delete cruft
           * [x] ./public/favicon.ico
           * [x] ./public/logo192.png
           * [x] ./public/logo512.png
           * [x] ./public/manifest.json
           * [x] ./public/robots.txt
           * [x] ./src/App.css
           * [x] ./src/App.test.js
           * [x] ./src/logo.svg
           * [x] ./src/reportWebVitals.js
           * [x] ./src/setupTests.js
           * [x] Update ./public/index.html
               * [x] From default file, delete:
                   * [x] Lines 4-26
                   * [x] Change Title to `FiftyGO`
                   * [x] Delete any additional comments here
           * [x] Update ./src/App.js
               * [x] From default file, delete:
                   * [x] Lines 7-20
                   * [x] Lines 1-2
           * [x] Update ./src/index.css\
               * [x] Trashcan it all
           * [x] Update ./src/index.js
           * [x] From default file, delete:
               * [x] Lines 14-17
               * [x] Lines 5
       * [x] Add additional dependencies
           * [x] `npm i react-router-dom `
       * [ ] Create components (indents below indicate parent-child relations)
           * [x] Nav Component
           * [x] Login Component
           * [x] Home Component - welcoming and showing all pub todos
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
  