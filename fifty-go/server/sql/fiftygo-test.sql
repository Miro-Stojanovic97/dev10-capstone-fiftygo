DROP DATABASE IF EXISTS fiftygo_test;
CREATE DATABASE fiftygo_test;

USE fiftygo_test;

CREATE TABLE `user` (
	user_id int primary key auto_increment,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    username varchar(50) not null,
    password_hash varchar(2048) not null,
    disabled bit not null default(0)
);

CREATE TABLE city (
	city_id int primary key,
    city_name varchar(50) not null,
    state_short char(2) not null,
    state_long varchar(50) not null,
    city_latitude decimal(7, 4) not null,
    city_longitude decimal(7, 4) not null
);

CREATE TABLE pin (
	pin_id int primary key auto_increment,
	pin_description varchar(300) not null,
    pin_date date null,
    pin_priority int not null,
    pin_did_it bit not null,
    user_id int not null,
    constraint fk_pin_user_id
		foreign key (user_id)
        references `user`(user_id)
);

CREATE TABLE trip (
	trip_id int primary key auto_increment,
    trip_description varchar(300) not null,
    trip_start_date date null,
    trip_end_date date null,
    transportation varchar(50) null,
    trip_priority int not null,
    trip_did_it bit not null,
    user_id int not null,
    constraint fk_trip_user_id
		foreign key (user_id)
        references `user`(user_id)
);

CREATE TABLE `type` (
	type_id int primary key auto_increment,
    type_name varchar(50) not null
);

CREATE TABLE `role` (
	role_id int primary key auto_increment,
    role_name varchar(20) not null
);

CREATE TABLE user_role (
	user_id int not null,
    role_id int not null,
    constraint pk_user_role
		primary key (user_id, role_id),
    constraint fk_user_role_user_id
		foreign key (user_id)
        references `user`(user_id),
	constraint fk_user_role_role_id
		foreign key (role_id)
        references `role`(role_id)
);

CREATE TABLE pin_type (
	pin_id int not null,
    type_id int not null,
    constraint pk_pin_type
		primary key (pin_id, type_id),
    constraint fk_pin_type_pin_id
		foreign key (pin_id)
        references pin(pin_id),
	constraint fk_pin_type_type_id
		foreign key (type_id)
        references `type`(type_id)
);

CREATE TABLE pin_city (
	pin_id int not null,
    city_id int not null,
    constraint pk_pin_city
		primary key (pin_id, city_id),
	constraint fk_pin_city_pin_id
		foreign key (pin_id)
        references pin(pin_id),
	constraint fk_pin_city_city_id
		foreign key (city_id)
        references city(city_id)
);

CREATE TABLE pin_trip (
	pin_id int not null,
    trip_id int not null,
    constraint pk_pin_trip
		primary key (pin_id, trip_id),
	constraint fk_pin_trip_pin_id
		foreign key (pin_id)
        references pin(pin_id),
	constraint fk_pin_trip_trip_id
		foreign key (trip_id)
        references trip(trip_id)
);


delimiter //
create procedure set_known_good_state()
begin

	DELETE FROM pin_trip;
	DELETE FROM pin_city;
	DELETE FROM pin_type;
	DELETE FROM `type`;
	ALTER TABLE `type` AUTO_INCREMENT = 1;
	DELETE FROM trip;
	ALTER TABLE trip AUTO_INCREMENT = 1;
	DELETE FROM pin;
	ALTER TABLE pin AUTO_INCREMENT = 1;
	DELETE FROM city;
    DELETE FROM user_role;
	DELETE FROM `role`;
	ALTER TABLE `role` AUTO_INCREMENT = 1;
	DELETE FROM `user`;
	ALTER TABLE `user` AUTO_INCREMENT = 1;

INSERT INTO `user` (first_name, last_name, username, password_hash, disabled)
	values
    ('John', 'Smith', 'jsmith1', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0),
	('Jane', 'Smith', 'jsmith2', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0),
    ('Judy', 'Smith', 'jsmith3', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0);
    
INSERT INTO `role` (role_name)
	values
    ('GUEST'),
	('USER'),
	('PREMIUM'),
	('ADMIN');
    
INSERT INTO user_role (user_id, role_id)
	values
    (1, 4),
    (2, 3),
    (3, 2);

INSERT INTO city (city_id, city_name, state_short, state_long, city_latitude, city_longitude)
	values
	(1840034016, 'New York', 'NY', 'New York', 40.6943, -73.9249),
	(1840020491, 'Los Angeles', 'CA', 'California', 34.1141, -118.4068),
	(1840000494, 'Chicago', 'IL', 'Illinois', 41.8375, -87.6866),
	(1840015149, 'Miami', 'FL', 'Florida', 25.784, -80.2101),
	(1840019440, 'Dallas', 'TX', 'Texas', 32.7935, -96.7667),
	(1840020925, 'Houston', 'TX', 'Texas', 29.786, -95.3885),
	(1840000673, 'Philadelphia', 'PA', 'Pennsylvania', 40.0077, -75.1339),
	(1840013660, 'Atlanta', 'GA', 'Georgia', 33.7628, -84.422),
	(1840006060, 'Washington', 'DC', 'District of Columbia', 38.9047, -77.0163),
	(1840000455, 'Boston', 'MA', 'Massachusetts', 42.3188, -71.0852),
	(1840020568, 'Phoenix', 'AZ', 'Arizona', 33.5722, -112.0892),
	(1840003971, 'Detroit', 'MI', 'Michigan', 42.3834, -83.1024),
	(1840021543, 'San Francisco', 'CA', 'California', 37.7558, -122.4449),
	(1840021117, 'Seattle', 'WA', 'Washington', 47.6211, -122.3244),
	(1840021990, 'San Diego', 'CA', 'California', 32.8313, -117.1222),
	(1840007830, 'Minneapolis', 'MN', 'Minnesota', 44.9635, -93.2678),
	(1840015982, 'Tampa', 'FL', 'Florida', 27.9945, -82.4447),
	(1840034030, 'Brooklyn', 'NY', 'New York', 40.6501, -73.9496),
	(1840018789, 'Denver', 'CO', 'Colorado', 39.762, -104.8758),
	(1840034002, 'Queens', 'NY', 'New York', 40.7498, -73.7976),
	(1840001592, 'Baltimore', 'MD', 'Maryland', 39.3051, -76.6144),
	(1840020364, 'Las Vegas', 'NV', 'Nevada', 36.2333, -115.2654),
	(1840001651, 'St. Louis', 'MO', 'Missouri', 38.6359, -90.2451),
	(1840020551, 'Riverside', 'CA', 'California', 33.9381, -117.3949),
	(1840019941, 'Portland', 'OR', 'Oregon', 45.5371, -122.65),
	(1840022220, 'San Antonio', 'TX', 'Texas', 29.4632, -98.5238),
	(1840021491, 'Sacramento', 'CA', 'California', 38.5677, -121.4685),
	(1630035577, 'San Juan', 'PR', 'Puerto Rico', 18.3985, -66.061),
	(1840021570, 'San Jose', 'CA', 'California', 37.3012, -121.848),
	(1840015099, 'Orlando', 'FL', 'Florida', 28.4773, -81.337),
	(1840000596, 'Cleveland', 'OH', 'Ohio', 41.4764, -81.6805),
	(1840001254, 'Pittsburgh', 'PA', 'Pennsylvania', 40.4397, -79.9763),
	(1840034000, 'Manhattan', 'NY', 'New York', 40.7834, -73.9662),
	(1840019590, 'Austin', 'TX', 'Texas', 30.3005, -97.7522),
	(1840003814, 'Cincinnati', 'OH', 'Ohio', 39.1413, -84.506),
	(1840030084, 'Indianapolis', 'IN', 'Indiana', 39.7771, -86.1458),
	(1840008535, 'Kansas City', 'MO', 'Missouri', 39.1238, -94.5541),
	(1840003760, 'Columbus', 'OH', 'Ohio', 39.9862, -82.9855),
	(1840014557, 'Charlotte', 'NC', 'North Carolina', 35.2083, -80.8303),
	(1840003871, 'Virginia Beach', 'VA', 'Virginia', 36.7335, -76.0435),
	(1840033999, 'Bronx', 'NY', 'New York', 40.8501, -73.8662),
	(1840003046, 'Milwaukee', 'WI', 'Wisconsin', 43.0642, -87.9675),
	(1840003289, 'Providence', 'RI', 'Rhode Island', 41.823, -71.4187),
	(1840015031, 'Jacksonville', 'FL', 'Florida', 30.3322, -81.6749),
	(1840021383, 'Salt Lake City', 'UT', 'Utah', 40.7776, -111.9311),
	(1840036155, 'Nashville', 'TN', 'Tennessee', 36.1715, -86.7842),
	(1840014497, 'Raleigh', 'NC', 'North Carolina', 35.8324, -78.6429),
	(1840015457, 'Memphis', 'TN', 'Tennessee', 35.1087, -89.9663),
	(1840001698, 'Richmond', 'VA', 'Virginia', 37.5295, -77.4756),
	(1840030815, 'Louisville', 'KY', 'Kentucky', 38.1663, -85.6485),
	(1840001839, 'New Orleans', 'LA', 'Louisiana', 30.0687, -89.9288),
	(1840004836, 'Bridgeport', 'CT', 'Connecticut', 41.1918, -73.1954),
	(1840020428, 'Oklahoma City', 'OK', 'Oklahoma', 35.4676, -97.5136),
	(1840000386, 'Buffalo', 'NY', 'New York', 42.9018, -78.8487),
	(1840004773, 'Hartford', 'CT', 'Connecticut', 41.7661, -72.6834),
	(1840020696, 'Fort Worth', 'TX', 'Texas', 32.7817, -97.3474),
	(1840022101, 'Tucson', 'AZ', 'Arizona', 32.1541, -110.8787),
	(1840013305, 'Honolulu', 'HI', 'Hawaii', 21.3294, -157.846),
	(1840021024, 'McAllen', 'TX', 'Texas', 26.2252, -98.2467),
	(1840023252, 'El Paso', 'TX', 'Texas', 31.8476, -106.43),
	(1840009315, 'Omaha', 'NE', 'Nebraska', 41.2627, -96.0529),
	(1840019176, 'Albuquerque', 'NM', 'New Mexico', 35.1054, -106.6465),
	(1840006507, 'Birmingham', 'AL', 'Alabama', 33.5279, -86.7971),
	(1840015988, 'Sarasota', 'FL', 'Florida', 27.3387, -82.5432),
	(1840034249, 'Dayton', 'OH', 'Ohio', 39.7805, -84.2003),
	(1840000373, 'Rochester', 'NY', 'New York', 43.168, -77.6162),
	(1840020319, 'Fresno', 'CA', 'California', 36.783, -119.7939),
	(1840021672, 'Tulsa', 'OK', 'Oklahoma', 36.1283, -95.9042),
	(1840001044, 'Allentown', 'PA', 'Pennsylvania', 40.5961, -75.4756),
	(1840018905, 'Concord', 'CA', 'California', 37.9722, -122.0016),
	(1840015130, 'Cape Coral', 'FL', 'Florida', 26.6443, -81.9957),
	(1840015163, 'Charleston', 'SC', 'South Carolina', 32.8168, -79.9687),
	(1840018825, 'Colorado Springs', 'CO', 'Colorado', 38.8674, -104.7605),
	(1840000466, 'Springfield', 'MA', 'Massachusetts', 42.1155, -72.5395),
	(1840002928, 'Grand Rapids', 'MI', 'Michigan', 42.9619, -85.6562),
	(1840020135, 'Ogden', 'UT', 'Utah', 41.2279, -111.9682),
	(1840014730, 'Columbia', 'SC', 'South Carolina', 34.0378, -80.9036),
	(1840013941, 'Baton Rouge', 'LA', 'Louisiana', 30.442, -91.1311),
	(1840014486, 'Knoxville', 'TN', 'Tennessee', 35.9692, -83.9496),
	(1840020580, 'Mission Viejo', 'CA', 'California', 33.6096, -117.6551),
	(1840000417, 'Albany', 'NY', 'New York', 42.6664, -73.7987),
	(1840000791, 'Akron', 'OH', 'Ohio', 41.0798, -81.5219),
	(1840004850, 'New Haven', 'CT', 'Connecticut', 41.3113, -72.9246),
	(1840020174, 'Provo', 'UT', 'Utah', 40.2457, -111.6457),
	(1840019148, 'Bakersfield', 'CA', 'California', 35.3529, -119.0359),
	(1840020553, 'Murrieta', 'CA', 'California', 33.5719, -117.1909),
	(1840007069, 'Des Moines', 'IA', 'Iowa', 41.5725, -93.6105),
	(1840000434, 'Worcester', 'MA', 'Massachusetts', 42.2705, -71.8079),
	(1840020566, 'Mesa', 'AZ', 'Arizona', 33.4015, -111.7178),
	(1840000572, 'Toledo', 'OH', 'Ohio', 41.6638, -83.5827),
	(1840015094, 'Palm Bay', 'FL', 'Florida', 27.9631, -80.6593),
	(1840034032, 'Staten Island', 'NY', 'New York', 40.5834, -74.1496),
	(1840001686, 'Wichita', 'KS', 'Kansas', 37.6895, -97.3443),
	(1840001288, 'Harrisburg', 'PA', 'Pennsylvania', 40.2752, -76.8843),
	(1840020490, 'Long Beach', 'CA', 'California', 33.7977, -118.167),
	(1840015509, 'Little Rock', 'AR', 'Arkansas', 34.7256, -92.3577),
	(1840002915, 'Madison', 'WI', 'Wisconsin', 43.0822, -89.393),
	(1840013501, 'Greenville', 'SC', 'South Carolina', 34.8354, -82.3646),
	(1840020121, 'Reno', 'NV', 'Nevada', 39.5497, -119.8483),
	(1840015119, 'Port St. Lucie', 'FL', 'Florida', 27.2796, -80.3884),
	(1840003718, 'Lancaster', 'PA', 'Pennsylvania', 40.042, -76.3012),
	(1840021093, 'Spokane', 'WA', 'Washington', 47.6671, -117.433),
	(1840019390, 'Denton', 'TX', 'Texas', 33.2175, -97.1418),
	(1840000500, 'Poughkeepsie', 'NY', 'New York', 41.695, -73.9211),
	(1840020296, 'Oakland', 'CA', 'California', 37.7904, -122.2166),
	(1840015324, 'Winston-Salem', 'NC', 'North Carolina', 36.1029, -80.261),
	(1840000378, 'Syracuse', 'NY', 'New York', 43.0407, -76.1437),
	(1840027142, 'Boise', 'ID', 'Idaho', 43.6005, -116.2308),
	(1840014569, 'Chattanooga', 'TN', 'Tennessee', 35.066, -85.2481),
	(1840029462, 'Augusta', 'GA', 'Georgia', 33.3645, -82.0708),
	(1840019422, 'Arlington', 'TX', 'Texas', 32.6998, -97.125),
	(1840021517, 'Stockton', 'CA', 'California', 37.9765, -121.3109),
	(1840013364, 'Durham', 'NC', 'North Carolina', 35.9792, -78.9022),
	(1840015064, 'Palm Coast', 'FL', 'Florida', 29.5389, -81.2457),
	(1840003389, 'Scranton', 'PA', 'Pennsylvania', 41.4044, -75.6649),
	(1840018794, 'Aurora', 'CO', 'Colorado', 39.7083, -104.7237),
	(1840020474, 'Oxnard', 'CA', 'California', 34.1964, -119.1815),
	(1840020287, 'Modesto', 'CA', 'California', 37.6375, -121.0028),
	(1840019304, 'Indio', 'CA', 'California', 33.7346, -116.2346),
	(1840015109, 'Kissimmee', 'FL', 'Florida', 28.3041, -81.4169),
	(1840003563, 'Youngstown', 'OH', 'Ohio', 41.0993, -80.6463),
	(1840015005, 'Pensacola', 'FL', 'Florida', 30.4413, -87.1911),
	(1840020516, 'Lancaster', 'CA', 'California', 34.6935, -118.1753),
	(1840019322, 'Anaheim', 'CA', 'California', 33.839, -117.8574),
	(1840013368, 'Fayetteville', 'AR', 'Arkansas', 36.0714, -94.1661),
	(1840014895, 'Jackson', 'MS', 'Mississippi', 32.3157, -90.2125),
	(1840021731, 'Victorville', 'CA', 'California', 34.5277, -117.3536),
	(1840014227, 'Bonita Springs', 'FL', 'Florida', 26.3558, -81.7859),
	(1840013356, 'Greensboro', 'NC', 'North Carolina', 36.0956, -79.8271),
	(1840019718, 'Corpus Christi', 'TX', 'Texas', 27.7254, -97.3767),
	(1840002949, 'Flint', 'MI', 'Michigan', 43.0236, -83.6921),
	(1840013490, 'Fayetteville', 'NC', 'North Carolina', 35.085, -78.9772),
	(1840021964, 'Santa Ana', 'CA', 'California', 33.7367, -117.8819),
	(1840008261, 'Fort Wayne', 'IN', 'Indiana', 41.0888, -85.1436),
	(1840006009, 'Mobile', 'AL', 'Alabama', 30.6782, -88.1162),
	(1840003102, 'Lansing', 'MI', 'Michigan', 42.7142, -84.5601),
	(1840003172, 'Ann Arbor', 'MI', 'Michigan', 42.2759, -83.731),
	(1840005061, 'Huntsville', 'AL', 'Alabama', 34.6981, -86.6412),
	(1840015211, 'Lexington', 'KY', 'Kentucky', 38.0423, -84.4587),
	(1840021488, 'Santa Rosa', 'CA', 'California', 38.4458, -122.7067),
	(1840018903, 'Antioch', 'CA', 'California', 37.9787, -121.796),
	(1840013411, 'Asheville', 'NC', 'North Carolina', 35.5707, -82.5537),
	(1840020361, 'Henderson', 'NV', 'Nevada', 36.0133, -115.0381),
	(1840008940, 'St. Paul', 'MN', 'Minnesota', 44.9478, -93.1039),
	(1840020151, 'Fort Collins', 'CO', 'Colorado', 40.5477, -105.0656),
	(1840015108, 'Lakeland', 'FL', 'Florida', 28.0557, -81.9545),
	(1840009904, 'Springfield', 'MO', 'Missouri', 37.1943, -93.2916),
	(1840019585, 'The Woodlands', 'TX', 'Texas', 30.1738, -95.5134),
	(1840015768, 'Shreveport', 'LA', 'Louisiana', 32.4653, -93.7955),
	(1840001383, 'Trenton', 'NJ', 'New Jersey', 40.2237, -74.7641),
	(1840020662, 'Plano', 'TX', 'Texas', 33.0502, -96.7486),
	(1840011171, 'Round Lake Beach', 'IL', 'Illinois', 42.3791, -88.0811),
	(1840009241, 'South Bend', 'IN', 'Indiana', 41.6767, -86.2696),
	(1840015830, 'Savannah', 'GA', 'Georgia', 32.0286, -81.1821),
	(1840002791, 'Newark', 'NJ', 'New Jersey', 40.7245, -74.1725),
	(1840007081, 'Davenport', 'IA', 'Iowa', 41.5565, -90.6053),
	(1840014717, 'Myrtle Beach', 'SC', 'South Carolina', 33.7094, -78.8844),
	(1840009357, 'Lincoln', 'NE', 'Nebraska', 40.8099, -96.6784),
	(1840009132, 'Rockford', 'IL', 'Illinois', 42.2596, -89.064),
	(1840001185, 'Reading', 'PA', 'Pennsylvania', 40.34, -75.9267),
	(1840000963, 'Canton', 'OH', 'Ohio', 40.8078, -81.3676),
	(1840019325, 'Irvine', 'CA', 'California', 33.6772, -117.7738),
	(1840020007, 'Eugene', 'OR', 'Oregon', 44.0564, -123.1174),
	(1840019350, 'Chula Vista', 'CA', 'California', 32.6281, -117.0144),
	(1840015977, 'St. Petersburg', 'FL', 'Florida', 27.7931, -82.6652),
	(1840021224, 'Salem', 'OR', 'Oregon', 44.9233, -123.0244),
	(1840015044, 'Lafayette', 'LA', 'Louisiana', 30.2082, -92.0325),
	(1840021002, 'Laredo', 'TX', 'Texas', 27.5625, -99.4874),
	(1840003600, 'Jersey City', 'NJ', 'New Jersey', 40.7184, -74.0686),
	(1840021864, 'Santa Clarita', 'CA', 'California', 34.4175, -118.4964),
	(1630035605, 'Aguadilla', 'PR', 'Puerto Rico', 18.4382, -67.1537),
	(1840015576, 'Wilmington', 'NC', 'North Carolina', 34.2099, -77.8866),
	(1840020604, 'Lubbock', 'TX', 'Texas', 33.5657, -101.8879),
	(1840019309, 'Chandler', 'AZ', 'Arizona', 33.2825, -111.8514),
	(1840021940, 'Scottsdale', 'AZ', 'Arizona', 33.6872, -111.8651),
	(1840015913, 'Tallahassee', 'FL', 'Florida', 30.4551, -84.2527),
	(1840008353, 'Montgomery', 'AL', 'Alabama', 32.3482, -86.2668),
	(1840009373, 'Peoria', 'IL', 'Illinois', 40.752, -89.6154),
	(1840020563, 'Glendale', 'AZ', 'Arizona', 33.5791, -112.2311),
	(1840014887, 'Columbus', 'GA', 'Georgia', 32.51, -84.8771),
	(1840023385, 'Anchorage', 'AK', 'Alaska', 61.1508, -149.1091),
	(1840021947, 'Gilbert', 'AZ', 'Arizona', 33.31, -111.7463),
	(1840020363, 'North Las Vegas', 'NV', 'Nevada', 36.2883, -115.0888),
	(1840019310, 'Avondale', 'AZ', 'Arizona', 33.3873, -112.3235),
	(1840020657, 'McKinney', 'TX', 'Texas', 33.2016, -96.667),
	(1840003869, 'Norfolk', 'VA', 'Virginia', 36.8945, -76.259),
	(1840003874, 'Chesapeake', 'VA', 'Virginia', 36.6778, -76.3023),
	(1840018481, 'Kennewick', 'WA', 'Washington', 46.1978, -119.1732),
	(1840015970, 'Winter Haven', 'FL', 'Florida', 28.0118, -81.7014),
	(1840019438, 'Irving', 'TX', 'Texas', 32.8583, -96.9702),
	(1840020707, 'Garland', 'TX', 'Texas', 32.91, -96.6304),
	(1840001472, 'York', 'PA', 'Pennsylvania', 39.9651, -76.7315),
	(1840014559, 'Concord', 'NC', 'North Carolina', 35.3933, -80.6369),
	(1840006112, 'Arlington', 'VA', 'Virginia', 38.8786, -77.1011),
	(1840003798, 'Atlantic City', 'NJ', 'New Jersey', 39.3797, -74.4527),
	(1840021639, 'Visalia', 'CA', 'California', 36.3276, -119.3269),
	(1840020292, 'Fremont', 'CA', 'California', 37.5265, -121.9843),
	(1840015157, 'Hialeah', 'FL', 'Florida', 25.8696, -80.3045),
	(1840002984, 'Nashua', 'NH', 'New Hampshire', 42.7491, -71.491),
	(1840020854, 'Killeen', 'TX', 'Texas', 31.0753, -97.7297),
	(1840013947, 'Gulfport', 'MS', 'Mississippi', 30.4274, -89.0704),
	(1840019743, 'Brownsville', 'TX', 'Texas', 25.9975, -97.458),
	(1840013730, 'Evansville', 'IN', 'Indiana', 37.9881, -87.5341),
	(1840002400, 'Appleton', 'WI', 'Wisconsin', 44.278, -88.3892),
	(1840027017, 'Navarre', 'FL', 'Florida', 30.4174, -86.8907),
	(1840073592, 'Bel Air South', 'MD', 'Maryland', 39.5022, -76.3113),
	(1840003185, 'Kalamazoo', 'MI', 'Michigan', 42.2749, -85.5882),
	(1840018410, 'Bremerton', 'WA', 'Washington', 47.5436, -122.7121),
	(1840033832, 'Spring Valley', 'NV', 'Nevada', 36.0952, -115.2636),
	(1840021728, 'San Bernardino', 'CA', 'California', 34.1416, -117.2943),
	(1840003858, 'Roanoke', 'VA', 'Virginia', 37.2785, -79.9581),
	(1840015482, 'Spartanburg', 'SC', 'South Carolina', 34.9442, -81.9251),
	(1840021129, 'Tacoma', 'WA', 'Washington', 47.2431, -122.4531),
	(1840033827, 'Enterprise', 'NV', 'Nevada', 36.0091, -115.2278),
	(1840002344, 'Green Bay', 'WI', 'Wisconsin', 44.5148, -87.9895),
	(1840000327, 'Portland', 'ME', 'Maine', 43.6773, -70.2715),
	(1840021844, 'Thousand Oaks', 'CA', 'California', 34.1914, -118.8756),
	(1840020402, 'Fontana', 'CA', 'California', 34.0968, -117.4599),
	(1840014524, 'Hickory', 'NC', 'North Carolina', 35.741, -81.3223),
	(1840020552, 'Moreno Valley', 'CA', 'California', 33.9244, -117.2045),
	(1840015072, 'Deltona', 'FL', 'Florida', 28.905, -81.2137),
	(1840000177, 'Fargo', 'ND', 'North Dakota', 46.8651, -96.8292),
	(1840021829, 'Santa Barbara', 'CA', 'California', 34.4285, -119.7202),
	(1840019570, 'College Station', 'TX', 'Texas', 30.5852, -96.2959),
	(1840014022, 'Gainesville', 'FL', 'Florida', 29.6804, -82.3459),
	(1840019156, 'Amarillo', 'TX', 'Texas', 35.1984, -101.8316),
	(1840004828, 'Norwich', 'CT', 'Connecticut', 41.5495, -72.0882),
	(1840019865, 'Olympia', 'WA', 'Washington', 47.0417, -122.8959),
	(1840003478, 'Yonkers', 'NY', 'New York', 40.9466, -73.8673),
	(1840020578, 'Huntington Beach', 'CA', 'California', 33.696, -118.0018),
	(1840020483, 'Glendale', 'CA', 'California', 34.1819, -118.2468),
	(1840007034, 'Aurora', 'IL', 'Illinois', 41.7638, -88.2902),
	(1840006211, 'Huntington', 'WV', 'West Virginia', 38.4109, -82.4345),
	(1840033833, 'Sunrise Manor', 'NV', 'Nevada', 36.1783, -115.0487),
	(1840015120, 'North Port', 'FL', 'Florida', 27.0576, -82.1977),
	(1840005613, 'Hagerstown', 'MD', 'Maryland', 39.6401, -77.7217),
	(1840020709, 'Grand Prairie', 'TX', 'Texas', 32.6871, -97.0208),
	(1840003834, 'Overland Park', 'KS', 'Kansas', 38.887, -94.687),
	(1840033743, 'Paradise', 'NV', 'Nevada', 36.0872, -115.1355),
	(1840021942, 'Tempe', 'AZ', 'Arizona', 33.3881, -111.9319),
	(1840021632, 'Salinas', 'CA', 'California', 36.6883, -121.6317),
	(1840000478, 'Erie', 'PA', 'Pennsylvania', 42.1167, -80.0733),
	(1840000471, 'Cedar Rapids', 'IA', 'Iowa', 41.9662, -91.6783),
	(1840004851, 'Waterbury', 'CT', 'Connecticut', 41.5582, -73.0361),
	(1840020654, 'Frisco', 'TX', 'Texas', 33.156, -96.8216),
	(1840022140, 'Waco', 'TX', 'Texas', 31.5599, -97.1882),
	(1840013468, 'Gastonia', 'NC', 'North Carolina', 35.2494, -81.1854),
	(1840014421, 'Clarksville', 'TN', 'Tennessee', 36.5692, -87.3413),
	(1840021189, 'Vancouver', 'WA', 'Washington', 45.6366, -122.5967),
	(1840000644, 'Lorain', 'OH', 'Ohio', 41.4409, -82.184),
	(1840020041, 'Nampa', 'ID', 'Idaho', 43.5844, -116.5638),
	(1840014236, 'Fort Lauderdale', 'FL', 'Florida', 26.1412, -80.1464),
	(1840020550, 'Hemet', 'CA', 'California', 33.7341, -116.9969),
	(1840003862, 'Newport News', 'VA', 'Virginia', 37.1051, -76.5185),
	(1840020410, 'Ontario', 'CA', 'California', 34.0393, -117.6064),
	(1840020411, 'Rancho Cucamonga', 'CA', 'California', 34.1247, -117.5667),
	(1840021499, 'Vallejo', 'CA', 'California', 38.1125, -122.2342),
	(1840020623, 'Oceanside', 'CA', 'California', 33.2247, -117.3083),
	(1840073853, 'Vero Beach South', 'FL', 'Florida', 27.6132, -80.4163),
	(1840015067, 'Ocala', 'FL', 'Florida', 29.178, -82.1511),
	(1840002648, 'Sioux Falls', 'SD', 'South Dakota', 43.5396, -96.7311),
	(1840004837, 'Danbury', 'CT', 'Connecticut', 41.4015, -73.4709),
	(1840020245, 'Elk Grove', 'CA', 'California', 38.4161, -121.3842),
	(1840014479, 'High Point', 'NC', 'North Carolina', 35.991, -79.9937),
	(1840020577, 'Garden Grove', 'CA', 'California', 33.7787, -117.9601),
	(1840020567, 'Peoria', 'AZ', 'Arizona', 33.7843, -112.2989),
	(1840015141, 'Pembroke Pines', 'FL', 'Florida', 26.0128, -80.3382),
	(1840020076, 'Medford', 'OR', 'Oregon', 42.3372, -122.854),
	(1840014495, 'Murfreesboro', 'TN', 'Tennessee', 35.849, -86.4121),
	(1840016196, 'Cary', 'NC', 'North Carolina', 35.7819, -78.8195),
	(1840008354, 'Lafayette', 'IN', 'Indiana', 40.3991, -86.8593),
	(1840019305, 'Corona', 'CA', 'California', 33.8616, -117.5649),
	(1840021579, 'Santa Cruz', 'CA', 'California', 36.9789, -122.0346),
	(1840014105, 'Spring Hill', 'FL', 'Florida', 28.4798, -82.53),
	(1840002870, 'Muskegon', 'MI', 'Michigan', 43.2281, -86.2562),
	(1840002983, 'Manchester', 'NH', 'New Hampshire', 42.9848, -71.4447),
	(1840019789, 'Marysville', 'WA', 'Washington', 48.0809, -122.1561),
	(1840009517, 'Springfield', 'IL', 'Illinois', 39.7709, -89.654),
	(1840005710, 'Frederick', 'MD', 'Maryland', 39.4337, -77.4141),
	(1840020293, 'Hayward', 'CA', 'California', 37.6328, -122.0766),
	(1840003837, 'Alexandria', 'VA', 'Virginia', 38.8185, -77.0861),
	(1630035622, 'Bayamón', 'PR', 'Puerto Rico', 18.3794, -66.1635),
	(1840020919, 'Port Arthur', 'TX', 'Texas', 29.8554, -93.9264),
	(1840020198, 'Lakewood', 'CO', 'Colorado', 39.6977, -105.1172),
	(1840003845, 'Fredericksburg', 'VA', 'Virginia', 38.2992, -77.4872),
	(1840015083, 'Leesburg', 'FL', 'Florida', 28.7672, -81.8962),
	(1840015144, 'Hollywood', 'FL', 'Florida', 26.0293, -80.1679),
	(1840020502, 'Palmdale', 'CA', 'California', 34.5944, -118.1057),
	(1840043455, 'Macon', 'GA', 'Georgia', 32.8065, -83.6974),
	(1840001626, 'Kansas City', 'KS', 'Kansas', 39.1235, -94.7443),
	(1840007239, 'Champaign', 'IL', 'Illinois', 40.1142, -88.2737),
	(1840021573, 'Sunnyvale', 'CA', 'California', 37.3836, -122.0255),
	(1840020930, 'Pasadena', 'TX', 'Texas', 29.6575, -95.1498),
	(1840020507, 'Pomona', 'CA', 'California', 34.0585, -117.7626),
	(1840020620, 'Escondido', 'CA', 'California', 33.1348, -117.0723),
	(1840015476, 'Mauldin', 'SC', 'South Carolina', 34.7821, -82.3032),
	(1840003219, 'New Bedford', 'MA', 'Massachusetts', 41.6697, -70.9428),
	(1840015034, 'Panama City', 'FL', 'Florida', 30.1995, -85.6003),
	(1840005563, 'Tuscaloosa', 'AL', 'Alabama', 33.2348, -87.5268),
	(1840015800, 'Warner Robins', 'GA', 'Georgia', 32.5961, -83.6527),
	(1840008143, 'Naperville', 'IL', 'Illinois', 41.748, -88.1659),
	(1840020313, 'Merced', 'CA', 'California', 37.3057, -120.4779),
	(1840008187, 'Elkhart', 'IN', 'Indiana', 41.6916, -85.9627),
	(1840008192, 'Joliet', 'IL', 'Illinois', 41.5188, -88.1499),
	(1840000460, 'Binghamton', 'NY', 'New York', 42.1014, -75.9093),
	(1840015063, 'Houma', 'LA', 'Louisiana', 29.58, -90.7059),
	(1840018417, 'Bellevue', 'WA', 'Washington', 47.5951, -122.1535),
	(1840001621, 'Topeka', 'KS', 'Kansas', 39.0346, -95.6955),
	(1840000838, 'Paterson', 'NJ', 'New Jersey', 40.9147, -74.1624),
	(1840015039, 'Lake Charles', 'LA', 'Louisiana', 30.201, -93.2111),
	(1840021873, 'Torrance', 'CA', 'California', 33.8346, -118.3416),
	(1840021422, 'Thornton', 'CO', 'Colorado', 39.9197, -104.9438),
	(1840022076, 'Tyler', 'TX', 'Texas', 32.3184, -95.3062),
	(1840029463, 'Athens', 'GA', 'Georgia', 33.9508, -83.3689),
	(1840019612, 'Beaumont', 'TX', 'Texas', 30.0849, -94.1451),
	(1840020255, 'Pueblo', 'CO', 'Colorado', 38.2701, -104.6114),
	(1840020794, 'Odessa', 'TX', 'Texas', 31.8801, -102.3448),
	(1840020713, 'Mesquite', 'TX', 'Texas', 32.7602, -96.5865),
	(1840020253, 'Fairfield', 'CA', 'California', 38.2583, -122.0335),
	(1840020505, 'Pasadena', 'CA', 'California', 34.1597, -118.139),
	(1840006196, 'Charleston', 'WV', 'West Virginia', 38.3484, -81.6322),
	(1840020576, 'Fullerton', 'CA', 'California', 33.8841, -117.9279),
	(1840015137, 'Miramar', 'FL', 'Florida', 25.9773, -80.3351),
	(1840020792, 'Midland', 'TX', 'Texas', 32.0243, -102.1147),
	(1840013612, 'Gainesville', 'GA', 'Georgia', 34.2902, -83.8294),
	(1840020582, 'Orange', 'CA', 'California', 33.8038, -117.8218),
	(1840003833, 'Olathe', 'KS', 'Kansas', 38.8833, -94.82),
	(1840021830, 'Santa Maria', 'CA', 'California', 34.9333, -120.4431),
	(1840021941, 'Surprise', 'AZ', 'Arizona', 33.6815, -112.4515),
	(1840020233, 'Roseville', 'CA', 'California', 38.7703, -121.3196),
	(1840013994, 'Metairie', 'LA', 'Louisiana', 29.9977, -90.178),
	(1840021998, 'Yuma', 'AZ', 'Arizona', 32.5995, -114.5491),
	(1840019436, 'Carrollton', 'TX', 'Texas', 32.989, -96.8999),
	(1840013362, 'Burlington', 'NC', 'North Carolina', 36.076, -79.4685),
	(1840021389, 'West Valley City', 'UT', 'Utah', 40.6886, -112.0123),
	(1840003866, 'Hampton', 'VA', 'Virginia', 37.0551, -76.363),
	(1840002493, 'Racine', 'WI', 'Wisconsin', 42.7274, -87.8135),
	(1840020149, 'Greeley', 'CO', 'Colorado', 40.4152, -104.7706),
	(1840021036, 'Harlingen', 'TX', 'Texas', 26.1916, -97.6977),
	(1630035637, 'Carolina', 'PR', 'Puerto Rico', 18.4054, -65.9792),
	(1840002418, 'Warren', 'MI', 'Michigan', 42.4934, -83.027),
	(1840020230, 'Grand Junction', 'CO', 'Colorado', 39.0877, -108.5673),
	(1840015134, 'Coral Springs', 'FL', 'Florida', 26.2702, -80.2591),
	(1840007391, 'Columbia', 'MO', 'Missouri', 38.9472, -92.3268),
	(1840007207, 'Bloomington', 'IL', 'Illinois', 40.4757, -88.9703),
	(1840003094, 'Sterling Heights', 'MI', 'Michigan', 42.5809, -83.0305),
	(1840004841, 'Stamford', 'CT', 'Connecticut', 41.1039, -73.5585),
	(1840018424, 'Kent', 'WA', 'Washington', 47.3887, -122.2128),
	(1840018346, 'Bellingham', 'WA', 'Washington', 48.7548, -122.469);

INSERT INTO pin (pin_description, pin_date, pin_priority, pin_did_it, user_id)
	values
    ('Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', '2023-11-18', 5, 0, 1),
	('Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt.', '2022-11-27', 5, 0, 3),
	('Suspendisse potenti.', '2023-08-03', 5, 0, 2),
	('Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', '2022-05-16', 2, 1, 2),
	('In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros.', '2023-12-08', 2, 0, 1),
	('Nulla nisl. Nunc nisl.', '2024-03-23', 2, 0, 3),
	('Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh.', '2022-02-02', 4, 1, 2),
	('Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', '2023-11-26', 2, 0, 3),
	('Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat.', '2022-04-04', 3, 1, 1),
	('Nulla justo. Aliquam quis turpis eget elit sodales scelerisque.', '2021-11-19', 5, 1, 2),
	('Curabitur gravida nisi at nibh.', '2022-04-20', 5, 1, 1),
	('Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', '2023-06-25', 3, 0, 3),
	('Nunc rhoncus dui vel sem. Sed sagittis.', '2021-11-16', 1, 1, 3),
	('Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.', '2024-03-21', 2, 0, 2),
	('Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo.', '2023-03-22', 3, 0, 1),
	('Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst.', '2023-07-29', 4, 0, 3),
	('Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.', '2023-04-24', 1, 0, 1),
	('Duis at velit eu est congue elementum.', '2023-06-12', 2, 0, 1),
	('Maecenas pulvinar lobortis est. Phasellus sit amet erat.', '2024-01-20', 5, 0, 3),
	('Etiam justo. Etiam pretium iaculis justo.', '2024-05-24', 4, 0, 2),
	('In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', '2023-06-25', 4, 0, 3),
	('Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', '2023-03-16', 1, 0, 2),
	('Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.', '2022-01-17', 5, 1, 2),
	('Etiam pretium iaculis justo. In hac habitasse platea dictumst.', '2021-12-14', 1, 1, 3),
	('Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum.', '2022-03-30', 1, 1, 2),
	('Aenean auctor gravida sem.', '2022-04-14', 4, 1, 3),
	('Etiam faucibus cursus urna. Ut tellus.', '2022-07-15', 4, 1, 3),
	('Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum.', '2022-11-23', 1, 0, 2),
	('In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', '2024-08-11', 2, 0, 2),
	('Ut at dolor quis odio consequat varius. Integer ac leo.', '2021-10-23', 3, 1, 3);
    
INSERT INTO trip (trip_description, trip_start_date, trip_end_date, transportation, trip_priority, trip_did_it, user_id)
	values
    ('Quisque arcu libero.', '2022-12-12', '2023-01-08', 'car', 4, 0, 2),
	('In congue.', '2022-07-16', '2022-07-20', 'rental car', 1, 1, 3),
	('In blandit ultrices enim.', '2022-05-17', '2022-05-30', 'bus', 4, 1, 1),
	('Integer non velit.', '2023-02-04', '2023-02-18', 'trains', 3, 0, 1),
	('Lorem ipsum dolor sit amet.', '2021-04-03', '2021-04-12', 'hiking', 1, 1, 3),
	('Ut tellus.', '2022-07-07', '2022-08-11', 'null', 5, 1, 3);
    
INSERT INTO `type` (type_name)
	values
    ('bike'),
	('hike'),
	('kayak'),
	('walk'),
	('visit a museum'),
	('go swimming'),
	('go climbing'),
	('go shopping'),
	('wing it'),
	('adventure'),
	('sing'),
	('skate'),
	('ice skate'),
	('barhop'),
	('eat'),
	('watch a sport'),
	('camp'),
	('go to an amusement park'),
	('go to a spa'),
	('find shells'),
	('find fossils'),
	('find rocks'),
	('take a class'),
	('dance'),
	('bowl'),
	('ski'),
	('snowboard'),
	('go tubing'),
	('visit a theme park'),
	('see some sights'),
	('visit a national park'),
	('visit a state park'),
	('visit a county park'),
	('stargaze');
    
insert into pin_type (pin_id, type_id)
	values
    (3, 4),
	(25, 5),
	(27, 10),
	(3, 14),
	(30, 23),
	(29, 8),
	(6, 6),
	(22, 23),
	(15, 13),
	(10, 1);
    
insert into pin_city (pin_id, city_id)
	values
    (22, 1840021024),
	(22, 1840000572),
	(8, 1840019570),
	(6, 1840003798),
	(16, 1840019865),
	(16, 1840021830),
	(23, 1840020925),
	(6, 1840033833),
	(29, 1840021117),
	(11, 1840009241),
	(23, 1840002791),
	(26, 1840020230),
	(13, 1840021873),
	(4, 1840001626),
	(10, 1840020296),
	(11, 1840007081),
	(9, 1840036155),
	(17, 1840005710),
	(24, 1840003046),
	(11, 1840013730);
    
insert into pin_trip (pin_id, trip_id)
	values
    (12, 2),
	(30, 1),
	(29, 4),
	(13, 6),
	(14, 3),
	(4, 3),
	(12, 1),
	(15, 2),
	(6, 3),
	(10, 5),
	(24, 4),
	(21, 6),
	(22, 4),
	(1, 1),
	(24, 1),
	(11, 4),
	(16, 4),
	(27, 5),
	(25, 3),
	(11, 2);

end //
delimiter ;

call set_known_good_state;