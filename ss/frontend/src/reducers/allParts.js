import { GET_ALLBUNDLES,
    GET_ALLTIMES,
    GET_ALLPARTS,
    MERGE_DATA,
} from '../actions/types.js';

const initialState = {
    allparts:[],
    alltimes:[],
    allbundles:[],
    alldata:[],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALLBUNDLES:
            return {
            ...state,
            allbundles: action.payload,
            };
        
        case GET_ALLTIMES:
            return {
            ...state,
            alltimes: [...state.alltimes, action.payload]
            };

        case GET_ALLPARTS:
            return {
            ...state,
            allparts: [...state.allparts, action.payload],
            };

        case MERGE_DATA:
            const { allbundles, allparts, alltimes } = state;
            let timelinesList = [ 'RFQ Issue', 'Tech Review', 'LOI Ringi', 'LOI Issue', 'Spec Meeting', 'Sample Submission' , 'Part Fitment', 'SOP Done'];
            let k = 1;
            let tmp4= [];
            (allbundles.length!==0 && allparts.length!==0 && alltimes.length!==0 && allparts.length===allbundles.length && alltimes.length===allbundles.length)? 
            allbundles.map((b,i)=>{
                allparts[i].map((p,j) => {
                    let tmp1 = {
                        id:k,
                        div:p.dept.slice(3,6),
                        dept:p.dept,
                        rootPart:p.rootPart,
                        itemCode: p.itemCode,
                        itemName: p.itemName,
                        bname: allbundles[i].bname,
                        vcode: p.vendorCode,
                        vname: p.vendorName,
                        avcode: allbundles[i].alternateVendorCode,
                        avname: allbundles[i].alternateVendor,
                        rnumber: allbundles[i].ringiNumber,
                        lnumber: allbundles[i].loiNumber,
                        tmodel: allbundles[i].testModel,
                    }
                    k=k+1;
                    let tmp2 = timelinesList.map((tl,k)=>
                                            (alltimes[i].filter(t=>t.activity===tl).length>0)?
                                            alltimes[i].filter(t=>t.activity===tl).map(a=>{
                                                return {
                                                    [`p_${k}_sd`]:a.startDate,
                                                    [`p_${k}_ed`]:a.endDate,
                                                    [`a_${k}_sd`]:a.actualSD,
                                                    [`a_${k}_ed`]:a.actualED,
                                                }
                                                
                                            })[0]:  {
                                                    [`a_${k}_sd`]:'-',
                                                    [`a_${k}_ed`]:'-',
                                                    [`p_${k}_sd`]:'-',
                                                    [`p_${k}_ed`]:'-',  
                                                }
                                            )
                    
                    
                    let tmp3 = {...tmp1, ...tmp2[0], ...tmp2[1],...tmp2[2],...tmp2[3],...tmp2[4],...tmp2[5],...tmp2[6],...tmp2[7] };

                    tmp4.push(tmp3);
                })}):''

            return {
                ...state,
                alldata: tmp4,
                };

        default:
            return state;
}
}