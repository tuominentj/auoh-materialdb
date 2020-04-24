const material_model = require('./material_model');

//HELPERS
const material_data = (req) =>{
    let data = {
        name: req.body.name,
        min_density: req.body.min_density,
        max_density: req.body.max_density,
        min_strength: req.body.min_strength,
        max_strength: req.body.max_strength,
        min_strength_density: req.body.min_strength / req.body.max_density,
        max_strength_density: req.body.max_strength / req.body.min_density
    };
    return data;
};

// create
const api_post_material = (req, res, next)=>{
    //puuttuu rivi
    let data = material_data(req);

    let new_material = material_model(data);

    new_material.save().then(()=>{
        console.log(new_material);
        res.send(JSON.stringify(new_material));
    }).catch(err => {
        res.status(500);
        //välitetään virhetieto myös postmanille
        res.send(err.errmsg);
        console.log(err);
    });

    //console.log(data);
    //alla oleva lähettää ja päättää lähetyksen samalla rivillä
    //res.send(JSON.stringify(data));
};

// read
const api_get_materials = (req, res, next)=>{
    //console.log('api_get_materials');
    material_model.find({})
    .lean()
    .then(materials => {
        res.send(JSON.stringify(materials));
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });
    //res.send(JSON.stringify([]));
};

// update
//PUT /api/material/5e87739680a811535c242661
const api_put_material = (req, res, next) => {
    //console.log('put osio')
    let id = req.params.id;
    let data = material_data(req);

    material_model.findByIdAndUpdate(id, data, {
        new: true
    }).then((material)=> {
        res.send(material);
    }).catch(err => {
            res.status(500);
            res.send(err.errmsg);
            console.log(err);
    });
};

// delete
//delete /api/material/5e87739680a811535c242661
const api_delete_material = (req, res, next) => {
    let id = req.params.id;
    material_model.findByIdAndRemove(id).then(() => {
        res.send();
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });
};

// exports
module.exports.api_post_material = api_post_material;
module.exports.api_get_materials = api_get_materials;
module.exports.api_put_material = api_put_material;
module.exports.api_delete_material = api_delete_material;
