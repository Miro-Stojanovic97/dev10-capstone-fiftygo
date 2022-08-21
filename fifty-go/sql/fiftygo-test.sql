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
	city_id int not null,
    city_name varchar(50) not null,
    state_short char(2) not null,
    state_long varchar(50) not null,
    city_latitude decimal(10, 8) not null,
    city_longitude decimal(10, 8) not null
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
	type_id int not null,
    type_name varchar(50) not null
);

CREATE TABLE `role` (
	role_id int not null,
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

