context catalogmini {
    entity PLANTS {
        key PLANT_ID :String(25);
             PLANT_NAME:String(100);
    }
    entity CUSTOMERS {
        key CUSTOMER_ID : String(25);
            CUSTOMER_NAME : String(100);
            CUSTOMER_EMAILID : String(100);
            CUSTOMER_CONTACTNO : String(10);
            CUSTOMER_lOCATION : String(200);
    }


    entity EMPLOYEE {
        key EMPLOYEE_ID : String(25);
            EMPLOYEE_NAME : String(100);
            EMPLOYEE_EMAILID : String(100);
            EMPLOYEE_CONTACTNO : String(10);
            EMPLOYEE_lOCATION : String(200);
            EMPLOYEE_DESIGNATION : String(200);
            EMPLOYEE_PLANT_LOCATION : String(200);
    }
    
}
