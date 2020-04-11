var express		= require('express'),
    app 		= express(),
    Companies 	= require("./models/companies.js"),


app.get("/Companies", function(req, res){
    Companies.find({}, function(err){
        if(err){
            res.send("Error including the company!!")
        } else {
            res.render("Companies", {Companies: Companies});
        }
    });
});

app.get("/saving", function(req, res){
    res.render("saving")
})

app.post("/Companies", function(req, res){
    // get data from form and add to Companies
    var name 	= req.body.NCompany;
    var image 	= req.body.LCompany;
    var CAC  	= req.body.CAC;
    var Sector 	= req.body.sector;
    var Info 	= req.body.ICompany;
    var Category= req.body.Category;
    var newCompany = {name: name, image: image, sector: sector, info: info, cac: cac, category: category}
    Companies.push(newCompany);
    //Redirect back to companies page
    res.Redirect("/companies")
});