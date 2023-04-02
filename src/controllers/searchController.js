import { STATUS_CODE } from '../utils/statusCode.js';
import { searchBy } from '../repositories/searchRepositories.js';

export async function search(req, res){
    const data=req.body;
    
    try{
        const byData=await searchBy(data);

        const joined=byData.rows.map((x)=>{
            return({
                id: x.id,
                name: x.name,
                crm: x.crm,
                crm_state: x.crm_state,
                phone: x.phone,
                specialty: x.specialty,
                email: x.email
            })
        })
        
        if(joined.length===0){
            return res.sendStatus(STATUS_CODE.NOT_FOUND);
        }

        return res.status(STATUS_CODE.OK).send(joined);
    }catch(err){
        return res.status(STATUS_CODE.SERVER_ERROR).send(err);
    }
}