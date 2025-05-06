context catalogmini {
    entity PLANTS {
        key PLANT_ID    : String(25);
            PLANT_NAME  : String(100);
            PLANT_LIMIT : String(200);
            BRANCH :String(100);
    }

    entity PLANT_SECTOR {
    key PLANT_ID   : String(25);
        PLANT_NAME : String(100);
        SUB_BRANCH_NAME : String(100);
}

    type Plants_type {
        PLANT_ID    : String(25);
        PLANT_NAME  : String(100);
        PLANT_LIMIT : String(200)
    }

    entity Log {
        key LOG_ID     : String(25);
            LOG_STATUS : String(100);
            LOG_TIME   : String(100);
            LOG_DATE   : String(100);
    }

    entity CUSTOMERS {
        key CUSTOMER_ID             : String(25);
            CUSTOMER_NAME           : String(100);
            CUSTOMER_EMAILID        : String(100);
            CUSTOMER_CONTACTNO      : String(10);
            CUSTOMER_lOCATION       : String(200);
            CUSTOMER_PLANT_LOCATION : String(200);
    }

    type Customer_type {
        CUSTOMER_ID             : String(25);
        CUSTOMER_NAME           : String(100);
        CUSTOMER_EMAILID        : String(100);
        CUSTOMER_CONTACTNO      : String(10);
        CUSTOMER_lOCATION       : String(200);
        CUSTOMER_PLANT_LOCATION : String(200);
    }


    entity EMPLOYEE {
        key EMPLOYEE_ID             : String(25);
            EMPLOYEE_NAME           : String(100);
            EMPLOYEE_EMAILID        : String(100);
            EMPLOYEE_CONTACTNO      : String(10);
            EMPLOYEE_lOCATION       : String(200);
            EMPLOYEE_DESIGNATION    : String(200);
            EMPLOYEE_PLANT_LOCATION : String(200);
            EMPLOYEE_LIMIT          : String(200);
    }


    type Employee_type {
        EMPLOYEE_ID             : String(25);
        EMPLOYEE_NAME           : String(100);
        EMPLOYEE_EMAILID        : String(100);
        EMPLOYEE_CONTACTNO      : String(10);
        EMPLOYEE_lOCATION       : String(200);
        EMPLOYEE_DESIGNATION    : String(200);
        EMPLOYEE_PLANT_LOCATION : String(200);
        EMPLOYEE_LIMIT          : String(200);
    }

}


@cds.persistence.exists
@cds.persistence.table
entity PLANS {
    key PLANT_ID   : String(25);
        PLANT_NAME : String(100);
}

@cds.persistence.exists
@cds.persistence.table
entity PSE {
    key PLANT_ID   : String(25);
        PLANT_NAME : String(100);
        BRANCH :String(100);
        SUB_BRANCH_NAME : String(100);
}


@cds.persistence.exists
@cds.persistence.table
entity CUS {
    key  CUSTOMER_ID             : String(25);
        CUSTOMER_NAME           : String(100);
        CUSTOMER_PLANT_LOCATION : String(200);
}

@cds.persistence.exists
@cds.persistence.table
entity CUSV {
    key CUSTOMER_ID             : String(25);
        CUSTOMER_NAME           : String(100);
        CUSTOMER_lOCATION       : String(200);
        CUSTOMER_PLANT_LOCATION : String(200);
        EMPLOYEE_PLANT_LOCATION : String(200);
}