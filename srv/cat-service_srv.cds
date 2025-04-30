using catalogmini from '../db/cat-service';

service mini_mart {

entity PLANT_INFO as projection on catalogmini.PLANTS;
entity CUSTOMERS_INFO as projection on catalogmini.CUSTOMERS;
entity EMPLOYEES_INFO as projection on catalogmini.EMPLOYEE;


function PostVaildation(FLAG:String)  returns String;

function PostVaildationArrays() returns String;

}
