using catalogmini from '../db/cat-service';
using PLANS from '../db/cat-service';
using PSE from '../db/cat-service';
using CUS from '../db/cat-service';
using CUSV from '../db/cat-service';

service mini_mart {

entity PLANT_INFO as projection on catalogmini.PLANTS;
entity PLANT_SECTOR_INFO as projection on catalogmini.PLANT_SECTOR;
entity LOG_INFO as projection on catalogmini.Log;
entity CUSTOMERS_INFO as projection on catalogmini.CUSTOMERS;
entity EMPLOYEES_INFO as projection on catalogmini.EMPLOYEE;

entity plansoptions as projection on PLANS;
entity plansection as projection on PSE;
entity customerview as projection on CUS;
entity custjoinview as projection on CUSV;

function PostVaildation(FLAG:String)  returns String;

function PostVaildationArrays() returns String;

function CallViews(Flag:String) returns String;

function CallViewsForPlants(Flag:String) returns String;

function CallViewsForCustomer(Flag:String) returns String;

action RunJob(Customers:array of catalogmini.Customer_type);

action RunJobEmployee(Employees:array of catalogmini.Employee_type);

action RunJobPlant(Plants:array of catalogmini.Plants_type)

}
