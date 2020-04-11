var express = require('express');
var router = express.Router();

router.post('/companyID', function(req, res, next) {
    res.send('respond with a resource');
        // get data from form and add to Companies
        var name    	= req.body.NCompany;
        var image   	= req.body.LCompany;
        var CAC     	= req.body.CAC;
        var Sector  	= req.body.Sector;
        var Info 	    = req.body.ICompany;
        var Category    = req.body.Category;
        var newCompany  = {
            name: name,
            image: image,
            sector: sector,
            info: details,
            cac: cac,
            category: category,
        };
        Companies.push(newCompany);
        //Redirect back to companies page
        res.Redirect("/services/companies")
    });

module.exports = router;