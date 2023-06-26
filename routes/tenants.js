const express = require("express");
const Tenants = require("../modals/Tenants");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./.env" });
const fetchUser = require("../middleware/fetchUser")

router.get('/gettenants',fetchUser,async (req,res)=>{
    try {
        const tenants = await Tenants.find({user:req.user.id});
        res.json(tenants);
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some Error Occured");
    }
    
})


//Route 2: Add note using Post "/api/notes/addnotes" login required

router.post('/addtenants',fetchUser,[
    body('Tenant_name','Enter a valid title').isLength({min:3}),
    body('Tenant_phone','Enter a valid Phone Number').isLength({min:10}),
    body('Tenant_email','Enter a valid email').isEmail(),
],async (req,res) => {
    
    try {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {Tenant_name,Tenant_phone,Tenant_address,Tenant_email,Tenant_adhaar,Tenant_type,Property_address,Owner_name,Property_type,Security,Rent} = req.body;

        const tenant = new Tenants({
            Tenant_name,Tenant_phone,Tenant_address,Tenant_email,Tenant_adhaar,Tenant_type,Property_address,Owner_name,Property_type,Security,Rent,user:req.user.id
        })
        const savedTenants = await tenant.save()
        res.json(savedTenants);
        


        
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some Error Occured");
    }
})


// Route 3: Update notes using PUT "/api/notes/updatenotes/:id" login required

router.put('/updatetenants/:id',fetchUser,async (req,res)=>{


    const {Tenant_name,Tenant_phone,Tenant_address,Tenant_email,Tenant_adhaar,Tenant_type,Property_address,Owner_name,Property_type,Security,Rent} = req.body;

    const newTenants ={};
    if(Tenant_name){newTenants.Tenant_name = Tenant_name}
    if(Tenant_phone){newTenants.Tenant_phone = Tenant_phone}
    if(Tenant_address){newTenants.Tenant_address = Tenant_address}
    if(Tenant_email){newTenants.Tenant_email = Tenant_email}
    if(Tenant_adhaar){newTenants.Tenant_adhaar = Tenant_adhaar}
    if(Tenant_type){newTenants.Tenant_type = Tenant_type}
    if(Property_address){newTenants.Property_address = Property_address}
    if(Owner_name){newTenants.Owner_name = Owner_name}
    if(Property_type){newTenants.Property_type = Property_type}
    if(Security){newTenants.Security = Security}
    if(Rent){newTenants.Rent = Rent}

    //find the note to be updated and update it

    let tenant = await Tenants.findById(req.params.id);
    if(!tenant){return res.status(404).send("Not found")}

    if(tenant.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed")
    }
  
    tenant = await Tenants.findByIdAndUpdate(req.params.id,{$set:newTenants},{new:true})
    res.json(tenant)
 }) 


 // Route 4: Delete notes using DELETE "/api/notes/deletenotes/:id" login required

router.delete('/deletetenants/:id',fetchUser,async (req,res)=>{

    //find the note to be deleted and delete it

    let tenants = await Tenants.findById(req.params.id);
    if(!tenants){return res.status(404).send("Not found")}

    if(tenants.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed")
    }
  
    tenants = await Tenants.findByIdAndDelete(req.params.id)
    res.json({"Succes":"Tenant has been deleted"})
 }) 
 
module.exports = router