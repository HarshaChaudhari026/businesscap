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

    entity SALES {
    key SALES_ID             : String(25);
        CUSTOMER_ID          : String(25);
        PRODUCT_ID           : String(25);
        QUANTITY_SOLD        : Integer;
        SALE_DATE            : Date;
        SALE_AMOUNT          : Integer;
}

entity SALES_LOG {
    key LOG_ID               : UUID;
        EVENT_TYPE           : String(100);
        RECORD_TYPE          : String(20);
        SALES_ID             : String(25);
        CUSTOMER_ID          : String(25);
        PRODUCT_ID           : String(25);
        QUANTITY_SOLD        : Integer;
        SALE_DATE            : Date;
        SALE_AMOUNT          : Integer;
}

entity USERS {
    key USER_ID : String(10);
        USER_NAME : String(100);
        USER_EMAILID: String(100);
        USER_CONTACTNO : String(10);
        USER_PURCHASE :String(100);
}

entity USER_INFO_LOG {
    key LOG_ID : UUID;
        EVENT_TYPE : String(50);
        RECORD_TYPE:String(50);
        USER_ID : String(10);
        USER_NAME : String(100);
        USER_EMAILID: String(100);
        USER_CONTACTNO : String(10);
        USER_PURCHASE :String(100);
}

entity INDUSTRY {
      key  IndustrySector:String(200);
        IndustrySystemType:String(200);
        BusinessPartner: String(200);
        IsStandardIndustry:String(200);
        IndustryKeyDescription :String(200);
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

