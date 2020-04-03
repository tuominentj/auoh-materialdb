


// create

const api_post_material = (req,res,next)=>{
    let data = req.body;
    console.log(data);
    res.send(JSON.stringify(data));
};

// read

const api_get_materials = (req, res, next)=>{
    res.send(JSON.stringify([]));
};

// update


// delete


// exports
module.exports.api_post_material = api_post_material;
module.exports.api_get_materials = api_get_materials;

