using catalogmini from '../db/cat-service';

service mini_mart {

entity PLANT_INFO as projection on catalogmini.PLANTS;
entity LOG_INFO as projection on catalogmini.Log;
entity CUSTOMERS_INFO as projection on catalogmini.CUSTOMERS;
entity EMPLOYEES_INFO as projection on catalogmini.EMPLOYEE;


function PostVaildation(FLAG:String)  returns String;

function PostVaildationArrays() returns String;

action RunJob(Customers:array of catalogmini.Customer_type);

action RunJobEmployee(Employees:array of catalogmini.Employee_type);

action RunJobPlant(Plants:array of catalogmini.Plants_type)

}
