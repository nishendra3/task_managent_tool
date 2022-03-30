import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBundles, getBundle, updateBundle } from '../../actions/addDetails';
import { addTimeline, getTimelines, updateTimeline  } from '../../actions/timelines';

import Select from 'react-select';
import { Fragment } from 'react';
import timelines from '../../reducers/timelines';

export class AddTimelines extends Component {
    // local state for react component - 
    state = {
        templateOptions:[{value:'T1', label:'Fastner Nut'},{value:'T2', label:'Sample Template'}],
        baseActivity:['','','','','','','',false,false],
        // baseActivity[0] -- task
        // baseActivity[1] -- planned start date
        // baseActivity[2] -- planned end date
        // baseActivity[3] -- actual start date
        // baseActivity[4] -- actual end date
        // baseActivity[5] -- Progress
        // baseActivity[6] -- related Bundle ID for backend entry // not needed due to "currentBundle" use case now | remove in future
        // baseActivity[7] -- boolean for setting readOnly property in Input tags
        // baseAdcitvity[8] -- boolean for capturing additional data fields
        activites:[['','','','','','','',false, false]],
        currentTemplate:null,
        currentBundle:null,
        currentUpdate:null,
        ringi_number: '',
        loi_number: '',
        test_model: '',
    };

    componentDidMount() {
        console.log(this.props)
        this.props.getBundles();
    }

    // on Select of update activities menu
    onUpdateSelect = (e) => {
        this.setState({currentBundle:null});
        this.setState({currentTemplate:null});
        this.setState({currentUpdate:e},()=>{
        if(this.state.currentUpdate!==null){
            const { currentUpdate, ringi_number, loi_number, test_model } = this.state;
            const { getTimelines, getBundle,  bundle } = this.props;

            // get timelines for selected bundle
            getTimelines(currentUpdate.value); // pass BUNDLE ID
            
            // get details for selected bundle
            getBundle(currentUpdate.value); // pass BUNDLE ID

        }
        });

    }

    // on close of update activities menu
    onUpdateClose = () => {
        const { ringi_number, loi_number, test_model } = this.state;

        let tmp = this.props.timelines.map((t,i)=>{
            return [
                t.activity,t.startDate,t.endDate,t.actualSD,t.actualED,t.completion,t.id,true,true
            ]
        });
        this.setState({activites:tmp});

        // set the state value for additional infos
        const { ringiNumber, loiNumber, testModel } = this.props.bundle
        this.setState({ringi_number:ringiNumber , loi_number:loiNumber, test_model:testModel})
    }
    

    
    // on change of values of timeline forms --

    onChange = (i,j,e) => {
        let activites = [...this.state.activites];
        let activity = [...activites[i]]
        activity[j] = e.target.value
        activites[i] = activity
        this.setState({activites})
    };

    // form add and remove button features --

    onRemove = (i,e) => {
        let activites = [...this.state.activites]
        activites.splice(i,1)
        this.setState({activites})
    }
    onAdd = (i,e) => {
        let activites = [...this.state.activites]
        activites.splice(i+1,0,this.state.baseActivity)
        this.setState({activites})
    }

    // add additional info
    addInfo = (x) => {
        const {ringi_number , loi_number, test_model } = this.state;
        switch(x) {
            case 'LOI Ringi' : 
            return <>
                <div className="row mt-2">
                <div className="col  text-right mt-4 pt-2"><h5>Ringi Number --</h5> </div>
                <div className="col text-center mt-4">
                    <input
                        className="form-control"
                        type="text"
                        name="ringi_number"
                        onChange={(e)=>this.setState({ringi_number:e.target.value})}
                        value={(ringi_number!==null)?ringi_number:''}
                    />
                </div>
                <div className="col  text-center mt-4"></div>
                </div> 
            </>;
            case 'LOI Issue' : 
            return <>
                <div className="row mt-2">
                <div className="col  text-right mt-4 pt-2"><h5>LOI Number  --</h5> </div>
                <div className="col text-center mt-4">
                    <input
                        className="form-control"
                        type="text"
                        name="loi"
                        onChange={(e)=>this.setState({loi_number:e.target.value})}
                        value={(loi_number!==null)?loi_number:''}
                    />
                </div>
                <div className="col  text-center mt-4"></div>
                </div> 
                </>;
            case 'Part Fitment' : 
            return <>
                <div className="row mt-2">
                <div className="col  text-right mt-4 pt-2"><h5>Test Model Number -- </h5></div>
                <div className="col text-center mt-4">
                    <input
                        className="form-control"
                        type="text"
                        name="test_model"
                        onChange={(e)=>this.setState({test_model:e.target.value})}
                        value={(test_model!==null)?test_model:''}
                    />
                </div>
                <div className="col  text-center mt-4"></div>
                </div> 
            </>;
            default:
                return ;
        }
         
        
    }

    // timeline form reset -- 

    onReset = (e) => {
        e.preventDefault();
        this.setState({currentBundle:null, currentTemplate:null, currentUpdate:null, activites:[this.state.baseActivity]});
    }

    // on close of tempate select menu --
    onTemplateSelect = (e) => {
        this.setState({currentUpdate:null});
        switch ((this.state.currentTemplate!==null)?this.state.currentTemplate.value:'') {
            case 'T1':
                {let activity = [...this.state.baseActivity];
                //activity[6]=(this.currentBundle==null)?null:this.currentBundle.value;
                activity[7]=true;
                activity.shift();
                let activites = [
                 ["Bidder Identification", ...activity],
                 ["RFQ Ringi Initiated", ...activity],
                 ["RFQ Issued", ...activity],
                 ["Quote Received", ...activity],
                 ["LOI Ringi", ...activity],
                 ["LOI", ...activity],
                 ["Spec Mtg", ...activity],
                 ["Sample Submission", ...activity],
                 ["Engg Go Ahead", ...activity],
                 ["FPP", ...activity],
                 ["VIR / PO", ...activity],
                 ["SOB", ...activity],
                 ["SOP", ...activity],  
                ]
                return this.setState({activites});}
            case 'T2':
                {let activity = [...this.state.baseActivity];
                //activity[6]=(this.currentBundle==null)?null:this.currentBundle.value;
                activity[7]=true;
                activity.shift();
                let activites = [
                 ["RFQ Issue", ...activity],
                 ["Tech Review",'','','','','','',false,false],
                 ["LOI Ringi", ...activity],
                 ["LOI Issue", ...activity],
                 ["Spec Meeting", ...activity],
                 ["Sample Submission", ...activity],
                 ["Part Fitment", ...activity],
                 ["SOP Done", ...activity],  
                ]
                return this.setState({activites});}
                
            default:
              return ;
          }
    }

    onSubmit = (e) => {
      e.preventDefault();
      const { activites, baseActivity, currentUpdate, currentBundle, ringi_number, loi_number, test_model } = this.state;
      const { addTimeline , updateTimeline } = this.props;
      
      // add or update the timelines based on the status of update timeline dropdown
      activites.map((t,i)=>{

        // timeline from the filled form -- 
        let timeline = { 
            activity:t[0],
            startDate:t[1],
            endDate:t[2],
            actualSD:(t[3]!=='')?t[3]:t[1],
            actualED:(t[4]!=='')?t[4]:t[2],
            completion:(t[5]!=='')?t[5]:'0',
            //order:t[6],
            order:`${i+1}`,
            bundle:(currentBundle===null && currentUpdate===null )?'':((currentBundle!==null)?currentBundle.value:currentUpdate.value)  // select bundle id to add or bundle id to update
         };
        
        // using t[6] to store the timeline ID
        // currentUpdate.value is the bundle to which timeline belongs
        (currentUpdate!==null)?updateTimeline(t[6], currentUpdate.value, timeline):addTimeline(timeline);
        //this.props.addTimeline(timeline);
      });

      // update bundle for ringi number, loi, test model
      if(currentUpdate!==null){
          // extract values from state and props
          // const { ringi_number , loi_number, test_model } = this.state;
          // const { currentBundle } = this.props;

          // bundle number to be updated
          let bundleNumber = currentUpdate.value;
          
          // data to be updated
          let bData =  {
              ringiNumber: ringi_number,
              loiNumber: loi_number,
              testModel: test_model,
          }
          
          // call the update bundle method from redux store
          this.props.updateBundle(bundleNumber, bData);
      }

      // update the state of current bundle to under timeline processing
      if(currentBundle!==null){

        // bundle number to be updated
        let bundleNumber = currentBundle.value;
        
        // data to be updated
        let bData =  {underTimeline: true,}
        
        // call the update bundle method from redux store
        this.props.updateBundle(bundleNumber, bData);
      }

      

      this.setState({currentBundle:null,currentTemplate:null, currentUpdate:null, activites:[baseActivity]});
    };

    onBundleClose = () => {
        const { baseActivity, currentUpdate } = this.state; 
        if(currentUpdate!==null){
            this.setState({currentUpdate:null, currentTemplate:null, activites:[baseActivity]});
        }
    }

    render() {
        
        const { templateOptions, currentUpdate , activites, baseActivity, currentTemplate, currentBundle} = this.state;
        const { bundles } = this.props;
        

        let b_menu = bundles.filter(b=>b.timelines.length===0).map((x,i)=> { return {value:x.id, label:`${x.bname} : ${x.alternateVendor}`}})
        let u_menu = bundles.filter(b=>b.timelines.length!==0).map((x,i)=> { return {value:x.id, label:`${x.bname} : ${x.alternateVendor}`}})
        
        
        return (
            <Fragment>
                <h2>ADD Timeline : </h2>
                <div className="container-fluid mt-4 mb-2 border border-secondary rounded p-5">
                <div className="row">
                    
                    <div className="col text-center pt-2"><label>SELECT BUNDLE</label></div>
                    <div className="col">
                    <Select 
                    //options={partOptions}
                    options = {b_menu}
                    value={currentBundle}
                    onChange={(e)=>this.setState({currentBundle:e})}
                    onMenuClose={this.onBundleClose}
                    closeMenuOnSelect={false}
                    isSearchable
                    name="bundle" 
                    maxMenuHeight={190} 
                    />
                    </div>
                    <div className="col text-center pt-2"><label>SELECT TEMPLATE</label></div>
                    <div className="col">
                    <Select 
                    options={templateOptions}
                    value={currentTemplate}
                    onChange={(e)=>this.setState({currentTemplate:e})}
                    onMenuClose = {this.onTemplateSelect}
                    closeMenuOnSelect={false}
                    isSearchable
                    name="template" 
                    maxMenuHeight={190} 
                    />
                    </div>
                    <div className="col text-center pt-2"><label>UPDATE EXISTING</label></div>
                    <div className="col">
                    <Select 
                        options={u_menu}
                        value={currentUpdate}
                        onChange={(e)=>this.onUpdateSelect(e)}
                        onMenuClose={this.onUpdateClose}
                        closeMenuOnSelect={false}
                        isSearchable
                        name="update" 
                        maxMenuHeight={190} 
                    />
                    </div>
                </div>
                

                    
                <div className="row card card-body mt-4 mb-4">
                    <h2>{(currentUpdate!==null)?'Update':'Add'} Activities</h2>
                    <hr />
                    <div className="row pb-0 mb-0">
                        <div className="col-sm-2 text-center">Task *</div>
                        <div className="col-sm-3 text-center">Planned Start-End *</div>
                        <div className="col-sm-3 text-center">Actual Start-End</div>
                        <div className="col text-center">Progress</div>
                        {/* <div className="col text-center">Order</div> */}
                        <div className="col"></div>
                    </div>
                    
                        <form>
                        {activites.map((activity,i)=>
                            <div key={i} >
                            <div className="row">
                                <div className="form-group col-sm-2 text-center mt-4">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="task"
                                        onChange={(e)=>this.onChange(i,0,e)}
                                        value={activity[0]}
                                        readOnly={activity[7]}
                                        
                                    />
                                </div>
                                <div className="col-sm-6 text-center">
                                    <div className="row">
                                        <div className="form-group col text-center">
                                            <input
                                                className="form-control"
                                                type="date"
                                                name="planned_start"
                                                onChange={(e)=>this.onChange(i,1,e)}
                                                value={activity[1]}
                                                readOnly={currentUpdate!==null}
                                            />
                                        </div>
                                        <div className="form-group col text-center">
                                            <input
                                                className="form-control"
                                                type="date"
                                                name="actual_start"
                                                placeholder="actual_start"
                                                onChange={(e)=>this.onChange(i,3,e)}
                                                value={activity[3]}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col text-center">
                                            <input
                                                className="form-control"
                                                type="date"
                                                name="planned_end"
                                                placeholder="planned end"
                                                onChange={(e)=>this.onChange(i,2,e)}
                                                value={activity[2]}
                                                readOnly={currentUpdate!==null}
                                            />
                                        </div>
                                        <div className="form-group col text-center">
                                            <input
                                                className="form-control"
                                                type="date"
                                                name="actual_end"
                                                onChange={(e)=>this.onChange(i,4,e)}
                                                value={activity[4]}
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                
                                <div className="form-group col text-center mt-4">
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="progress"
                                        onChange={(e)=>this.onChange(i,5,e)}
                                        value={activity[5]}
                                    />
                                </div>
                                {/* <div className="form-group col text-center mt-4" >
                                    
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="order"
                                        onChange={(e)=>this.onChange(i,6,e)}
                                        value={activity[6]}
                                    />
                                </div> */}
                                {
                                    (!activity[8])?
                                    <>
                                        <div className="col text-center mt-4 pt-1">
                                        <button type="button" hidden={currentUpdate!==null} className="btn btn-sm btn-success mr-2 rounded-pill" onClick={(e)=>this.onAdd(i,e)}>
                                            +
                                        </button>
                                        
                                        <button type="button" hidden={activites.length===1 || activity[7]} className="btn btn-sm btn-danger rounded-pill" onClick={(e)=>this.onRemove(i,e)}>
                                            -
                                        </button>
                                        
                                        </div>
                                    </>
                                    :<></>
                                }
                                
                                
                            </div>
                            {/* capture additional info for some of the tasks */}
                                {
                                    (activity[8])?this.addInfo(activity[0]):<></>
                                }
                            <hr />
                                
                            
                            </div>
                            
                        )}
                    <div className="form-group text-center">
                        <button className="btn btn-secondary mr-4" onClick={this.onReset}>
                            Reset
                        </button>
                        <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>
                            {(currentUpdate!==null)?'Update':'Submit'}
                        </button>
                    </div>
                        </form>
                    <hr />
                   
                </div>
                    
                
                </div>

            </Fragment>
        )
    }
}


const mapStateToProps = (state) => ({
    bundles: state.addDetails.bundles,
    bundle: state.addDetails.bundle,
    timelines: state.timelines.timelines,
  });
  
export default connect(mapStateToProps, { getBundles, getBundle, updateBundle, addTimeline, getTimelines, updateTimeline })(AddTimelines);