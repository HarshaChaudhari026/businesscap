const { cds2edm } = require("@sap/cds/libx/odata/utils")


module.exports = async srv =>{
    srv.before(["CREATE"],'PLANT_INFO',async (req,res)=>{
        try {
            if (req.data.PLANT_NAME=="") {
               req.data.PLANT_NAME="External"
            }
        } catch (error) {
            console.log(error)
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
      
      
}