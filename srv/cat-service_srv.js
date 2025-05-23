const cds = require("@sap/cds");
const { v4:uuid4 } = require("uuid");



module.exports = async srv =>{

// const bp = await cds.connect.to("API_BUSINESS_PARTNER");

    // srv.on("READ", "buIndustry", async(req, res)=>{
    //   try {
    //     const response = await bp.run(req.query); 
    //     for (const item of response) {
    //       await cds.run(INSERT.into("CATALOGMINI_INDUSTRY").entries(item));
    //     }
    //     return response;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // })

    // srv.on('ImportAddress',async(req,res)=>{
    //   try {
        
    //     let Retrievedata = await bp.get("/A_BuPaIndustry")

    //     await cds.run(INSERT.into("CATALOGMINI_INDUSTRY").entries(Retrievedata));

    //   } catch (error) {
    //     console.log(error)
    //   }
    // })


    srv.before(["CREATE"],'PLANT_INFO',async (req,res)=>{
        try {
            if (req.data.PLANT_NAME=="") {
               req.data.PLANT_NAME="External"
            }
        } catch (error) {
            console.log(error)
        }
    })

    srv.on(['CREATE'],'PLANT_INFO',async(req,res)=>{
      try {
        console.log("On Event Triggered")
      } catch (error) {
        console.log(error)
      }
    })

    srv.after(['CREATE'],'PLANT_INFO',async(req,res)=>{
      try {
        console.log("After Event Triggered")
        
      } catch (error) {
        console.log(error)
      }
    })

    srv.on('RunJob',async(req,res)=>{
      try {
        await cds.run(INSERT.into("CATALOGMINI_CUSTOMERS").entries(req.data.Customers))
        let log_payload={
          "LOG_ID":"AX-48",
          "LOG_STATUS":"Sucess",
          "LOG_TIME":(new Date().getTime())+"",
          "LOG_DATE":new Date()+""
         }
         await cds.run(INSERT.into("CATALOGMINI_LOG").entries(log_payload)).upsert()
        console.log("done")

      } catch (error) {
        console.log(error)
        let log_payload={
          "LOG_ID":"AX-47",
          "LOG_STATUS":"Error",
          "LOG_TIME":(new Date().getTime())+"",
          "LOG_DATE":new Date()+""
         }
         await cds.run(INSERT.into("CATALOGMINI_LOG").entries(log_payload)).upsert()
      }
    })

    srv.on('RunJobEmployee', async(req, res)=>{
      try{
        const employeesLimit = req.data.Employees.map(emp => parseInt(emp.EMPLOYEE_LIMIT, 10));
        const maxLimit = Math.max(...employeesLimit);
        if(maxLimit < 100){
          await cds.run(INSERT.into("CATALOGMINI_EMPLOYEE").entries(req.data.Employees));
          let log_payload={
            "LOG_ID":"AX-27",
            "LOG_STATUS":"Sucess",
            "LOG_TIME":(new Date().getTime())+"",
            "LOG_DATE":new Date()+""
           }
           await cds.run(INSERT.into("CATALOGMINI_LOG").entries(log_payload));
          console.log(employeesLimit);
        }else{
          console.log(req.data.Employees);
          let log_payload={
            "LOG_ID":"AX-83",
            "LOG_STATUS":"Error",
            "LOG_TIME":(new Date().getTime())+"",
            "LOG_DATE":new Date()+""
           }
           await cds.run(INSERT.into("CATALOGMINI_LOG").entries(log_payload));
         }  
      }catch (error) {
        console.log(error)
        let log_payload={
          "LOG_ID":"AX-92",
          "LOG_STATUS":"Error",
          "LOG_TIME":(new Date().getTime())+"",
          "LOG_DATE":new Date()+""
         }
         await cds.run(INSERT.into("CATALOGMINI_LOG").entries(log_payload));
      }
    })

    srv.on('RunJobPlant', async(req, res)=>{
      try{
        const plantsLimit = req.data.Plants.map(plant =>{
          const limit = plant.PLANT_LIMIT;
          return limit;
        })
        if(plantsLimit < 100 ){
           await cds.run(INSERT.into("CATALOGMINI_PLANTS").entries(req.data.Plants));
          let log_payload={
            "LOG_ID":"AX-18",
            "LOG_STATUS":"Sucess",
            "LOG_TIME":(new Date().getTime())+"",
            "LOG_DATE":new Date()+""
           }
           await cds.run(INSERT.into("CATALOGMINI_LOG").entries(log_payload));
          console.log(plantsLimit);
        }else{
          console.log(req.data.Employees);
          let log_payload={
            "LOG_ID":"AX-20",
            "LOG_STATUS":"Error",
            "LOG_TIME":(new Date().getTime())+"",
            "LOG_DATE":new Date()+""
           }
           await cds.run(INSERT.into("CATALOGMINI_LOG").entries(log_payload));
         }  
      }catch (error) {
        console.log(error)
        let log_payload={
          "LOG_ID":"AX-20",
          "LOG_STATUS":"Error",
          "LOG_TIME":(new Date().getTime())+"",
          "LOG_DATE":new Date()+""
         }
         await cds.run(INSERT.into("CATALOGMINI_LOG").entries(log_payload));
       }
    })

    srv.on('PostVaildation',async(req,res)=>{
        try {
            if (req.data.FLAG=="C") {
                let Customer = await cds.run("select * from CATALOGMINI_CUSTOMERS;")
                return Customer
            }
            if (req.data.FLAG=="P") {
                let plants = await cds.run("select * from CATALOGMINI_PLANTS;")
                return plants
            }
            if (req.data.FLAG=="E") {
                let employess = await cds.run("select * from CATALOGMINI_EMPLOYEE;")
                return employess
            }
            if (req.data.FLAG=="ALL") {
                let employess = await cds.run("select * from CATALOGMINI_EMPLOYEE;")   
                let plants = await cds.run("select * from CATALOGMINI_PLANTS;")
                let Customer = await cds.run("select * from CATALOGMINI_CUSTOMERS;")
                return {
                    c : Customer,
                    e:employess,
                    p:plants
                }
            }
          
        } catch (error) {
            console.log(error)
        }
    })

    srv.on('PostVaildationArrays', async (req, res) => {
        try {
          const employees = await cds.run("SELECT * FROM CATALOGMINI_EMPLOYEE");
          const plants = await cds.run("SELECT * FROM CATALOGMINI_PLANTS");
          const customers = await cds.run("SELECT * FROM CATALOGMINI_CUSTOMERS");
      
          const customersWithEmployees = customers.map(customer => {
            const customerEmployees = employees.filter(emp =>
              emp.EMPLOYEE_PLANT_LOCATION === customer.CUSTOMER_PLANT_LOCATION
            );
            return { ...customer, employees: customerEmployees };
          });
      
          

          
          const plantsWithHierarchy = plants
            .map(plant => {
              const matchingCustomers = customersWithEmployees.filter(cust =>
                cust.CUSTOMER_PLANT_LOCATION === plant.PLANT_NAME
              );
              return { ...plant, customers: matchingCustomers };
            })
            .filter(plant => plant.customers.length > 0); 
      
          return plantsWithHierarchy;
        } catch (error) {
          console.error('Error in PostVaildationArrays:', error);
          return { error: 'Internal server error' };
        }
      });
      
      srv.on('CallViews',async(req,res)=>{
        try {
          if (req.data.Flag == 'P') {
            let pls = await cds.run("select PLANT_ID,PLANT_NAME from CATALOGMINI_PLANTS;")

            console.log(pls)
          }
        } catch (error) {
          console.log(error)
        }
      })

      srv.on('CallViewsForPlants',async(req,res)=>{
        try {
          if (req.data.Flag == 'P') {
            let pls = await cds.run(
              `SELECT cp.PLANT_ID,cp.PLANT_NAME, cp.BRANCH ,cs.SUB_BRANCH_NAME
              FROM CATALOGMINI_PLANTS as cp
              INNER JOIN CATALOGMINI_PLANT_SECTOR as cs ON cp.PLANT_ID = cs.PLANT_ID;`
              )

            console.log(pls)
          }
        } catch (error) {
          console.log(error)
        }
      })

      srv.on('CallViewsForCustomer',async(req,res)=>{
        try {
          if (req.data.Flag == 'C') {
            let pls = await cds.run(
              `select CUSTOMER_ID ,CUSTOMER_NAME, CUSTOMER_PLANT_LOCATION from CATALOGMINI_CUSTOMERS;`
              )

            console.log(pls)
          }
        } catch (error) {
          console.log(error)
        }
      })

      srv.after('CREATE', 'users_info', async (data, req) => {
          await srv.emit('OrderCreated', { ID: data.USER_ID, USER_NAME: data.USER_NAME,EventType:"CREATE" });
      });
      
      srv.on('OrderCreated', async (msg) => {
          const { ID, USER_NAME } = msg.data;
          let payload = {
            LOG_ID : uuid4(uuid4),
            EVENT_TYPE : "CREATE",
            RECORD_TYPE: "NEW",
            USER_ID : ID,
            USER_NAME : USER_NAME
          }
          await cds.run(UPSERT.into("CATALOGMINI_USER_INFO_LOG").entries(payload))
      });

      

      srv.after('UPDATE', 'users_info', async (data, req) => {
        await srv.emit('OrderUpdated', { ID: data.USER_ID, USER_NAME: data.USER_NAME,EventType:"UPDATE" });
      });
    
      srv.on('OrderUpdated', async (msg) => {
          const { ID, USER_NAME } = msg.data;
          let payload = {
            LOG_ID : uuid4(uuid4),
            EVENT_TYPE : "UPDATE",
            RECORD_TYPE: "OLD",
            USER_ID : ID,
            USER_NAME : USER_NAME
          }
          await cds.run(INSERT.into("CATALOGMINI_USER_INFO_LOG").entries(payload))
      });

      srv.after('DELETE', 'users_info', async (data, req) => {
        await srv.emit('OrderDeleted', { ID: data.USER_ID, USER_NAME: data.USER_NAME,EventType:"DELETE" });
      });

      srv.on('OrderDeleted', async (msg) => {
          const { ID, USER_NAME ,EventType} = msg.data;
          let payload = {
            LOG_ID : uuid4(uuid4),
            EVENT_TYPE : EventType,
            RECORD_TYPE: "OLD",
            USER_ID : ID,
            USER_NAME : USER_NAME
          }
          await cds.run(INSERT.into("CATALOGMINI_USER_INFO_LOG").entries(payload))
      });
}