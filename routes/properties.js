const express = require("express");
const Properties = require("../modals/Properties");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./.env" });
const fetchUser = require("../middleware/fetchUser")

router.get('/getproperties',fetchUser,async (req,res)=>{
    try {
        const property = await Properties.find({user:req.user.id});
        console.log(req.user.id);
        res.json(property);
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some Error Occured");
    }
    
})


//Route 2: Add note using Post "/api/notes/addnotes" login required

router.post('/addproperty',fetchUser,[
    body('Owner_name','Enter a valid title').isLength({min:3}),
    body('Owner_phone','Enter a valid Phone Number').isLength({min:10}),
    body('Owner_email','Enter a valid email').isEmail(),
],async (req,res) => {
    
    try {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let {Property_status} = req.body
        if(Property_status === "Occupied"){
            
            const {Owner_name,Owner_phone,Owner_address,Owner_email,Property_address,Property_status,Property_tenant_name,Property_tenant_address,Property_tenant_phone,Property_tenant_type,Property_type,Rooms,Toilets,Electricity,Water_supply,Security,Rent,Tenants_count} = req.body;

            const property = new Properties({
                Owner_name,Owner_phone,Owner_address,Owner_email,Property_address,Property_status,Property_tenant_name,Property_tenant_address,Property_tenant_phone,Property_tenant_type,Property_type,Rooms,Toilets,Electricity,Water_supply,Security,Rent,Tenants_count,user:req.user.id
            })
            const savedProperty = await property.save()
            res.json(savedProperty);
        }
        else{
            console.log("Hello");
            const {Owner_name,Owner_phone,Owner_address,Owner_email,Property_address,Property_status,Property_type,Rooms,Toilets,Electricity,Water_supply,Security,Rent} = req.body;

            console.log("Rumble");
            const property = new Properties({
                Owner_name,Owner_phone,Owner_address,Owner_email,Property_address,Property_status,Property_type,Rooms,Toilets,Electricity,Water_supply,Security,Rent,user:req.user.id
            })
            const savedProperty = await property.save()
            res.json(savedProperty);
        }


        
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some Error Occured");
    }
})


// Route 3: Update notes using PUT "/api/notes/updatenotes/:id" login required

router.put('/updateproperty/:id',fetchUser,async (req,res)=>{


    const {Owner_name,Owner_phone,Owner_address,Owner_email,Property_address,Property_status,Property_tenant_name,Property_tenant_address,Property_tenant_phone,Property_tenant_type,Property_type,Rooms,Toilets,Electricity,Water_supply,Security,Rent,Tenants_count} = req.body;

    const newProperty ={};
    if(Owner_name){newProperty.Owner_name = Owner_name}
    if(Owner_phone){newProperty.Owner_phone = Owner_phone}
    if(Owner_address){newProperty.Owner_address = Owner_address}
    if(Owner_email){newProperty.Owner_email = Owner_email}
    if(Property_address){newProperty.Property_address = Property_address}
    if(Property_status){newProperty.Property_status = Property_status}
    if(Property_tenant_name){newProperty.Property_tenant_name = Property_tenant_name}
    if(Property_tenant_address){newProperty.Property_tenant_address = Property_tenant_address}
    if(Property_tenant_phone){newProperty.Property_tenant_phone = Property_tenant_phone}
    if(Property_tenant_type){newProperty.Property_tenant_type = Property_tenant_type}
    if(Rooms){newProperty.Rooms = Rooms}
    if(Toilets){newProperty.Toilets = Toilets}
    if(Electricity){newProperty.Electricity = Electricity}
    if(Water_supply){newProperty.Water_supply = Water_supply}
    if(Security){newProperty.Security = Security}
    if(Rent){newProperty.Rent = Rent}
    if(Tenants_count){newProperty.Tenants_count = Tenants_count}

    //find the note to be updated and update it

    let property = await Properties.findById(req.params.id);
    if(!property){return res.status(404).send("Not found")}

    if(property.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed")
    }
  
    property = await Properties.findByIdAndUpdate(req.params.id,{$set:newProperty},{new:true})
    res.json(property)
 }) 


 // Route 4: Delete notes using DELETE "/api/notes/deletenotes/:id" login required

router.delete('/deleteproperty/:id',fetchUser,async (req,res)=>{

    //find the note to be deleted and delete it

    let property = await Properties.findById(req.params.id);
    if(!property){return res.status(404).send("Not found")}

    if(property.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed")
    }
  
    property = await Properties.findByIdAndDelete(req.params.id)
    res.json({"Succes":"Property has been deleted"})
 }) 
 
module.exports = router