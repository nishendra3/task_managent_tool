
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getParts, updatePart, updateBC, updateIC, updateSParts } from '../../actions/parts';
import { createMessage } from '../../actions/messages';
import Select from 'react-select';




export class Parts extends Component {

  static propTypes = {
    parts: PropTypes.array.isRequired,
    getParts: PropTypes.func.isRequired,
  };
  
  componentDidMount() {
    this.props.getParts();
    console.log('parts mounted ok')
  }
  

  onProceed = ()=>{
    this.props.selectedParts.map(i=>i.map(p=>this.props.updatePart(p.id,{underProcess:true})));
    this.props.createMessage({ updatePart: 'Parts added successfully. Proceed to next section!' });
  }

  render() {

    const {buyerCode, itemCode, selectedParts } = this.props;
    
    let bc_unique = this.props.parts
                    .map((part)=>(part.buyerCode))
                    .filter((x,i,a)=>a.indexOf(x)==i)
                    .map((x,i)=> { return {value:x, label:x}})

    let ic_unique = this.props.parts
                    .map((part)=>(part.buyerCode===(buyerCode===null?'':buyerCode.value) ? part: -1))
                    .filter((part)=>part!==-1)
                    .map(p=>{return [p.itemCode, p.itemName]})
                    .filter((x,i,a)=>a.map(p=>p[0]).indexOf(x[0])==i)
                    .map((x,i)=> { return {value:x[0], label:`${x[0]} : ${x[1]}`}})

    return (
      <Fragment>
        
        <h2>SELECT REQUIRED PARTS : </h2>
        <div className="container-fluid mt-4 mb-2 border border-secondary rounded p-5">
              {/* row for dropdown select menus */}
              <div className="row">
                <div className="col text-center pt-2"><label>Buyer Code</label></div>
                <div className="col">
                <Select 
                  options={bc_unique}
                  // value={(buyerCode==[])?null:buyerCode}
                  value={buyerCode}
                  onChange={(e)=>this.props.updateBC(e)}
                  isSearchable
                  name="buyerCode"  
                  maxMenuHeight={190}
                />
                </div>
                <div className="col text-center pt-2"><label>Item Code</label></div>
                <div className="col-sm-6">
                <Select
                  options={ic_unique}
                  value={itemCode}
                  onChange={(e)=>this.props.updateIC(e)}
                  onMenuClose = {()=>{
                      this.props.updateSParts((buyerCode==null)?buyerCode:buyerCode.value, (itemCode==null)?itemCode:itemCode.map(p=>p.value));
                  }}
                  isSearchable
                  isMulti
                  closeMenuOnSelect={false}
                  name="itemCode" 
                  maxMenuHeight={190} 
                />
                </div>
              </div>
              
              <div className="row mt-5 d-flex align-items-center justify-content-center">
                <h3>Selected Parts</h3>
                <table className="table table-striped text-center">
                  <thead>
                    <tr>
                    <th className="align-middle">Root Part</th>
                      <th className="align-middle">Item Name</th>
                      <th>Details
                        <table className="table table-striped">
                          <thead>
                          <tr>
                            <th>Vendor Code</th>
                            <th>Vendor Name</th>
                            
                            <th>Current SOB</th>
                          </tr>
                          </thead>
                        </table>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      selectedParts.map((p,i)=>
                        <tr key={i}>
                          <td className="align-middle">
                            {p[0].rootPart}
                          </td>
                          <td className="align-middle">
                            {p[0].itemName}
                          </td>
                          
                          <td>
                            <table className="table table-striped text-center">
                                  <tbody>
                                    {p.map(part=>
                                      <tr key={part.id}>
                                        
                                        <td>{part.vendorCode}</td>
                                        <td>{part.vendorName}</td>
                                        <td>{part.currentBasicCost}</td>
                                        <td>{part.currentSOB}</td>
                                        
                                      </tr>
                                    )}
                                  </tbody>
                            </table>
                          </td>
                        </tr>
                      )
                    }
                  </tbody>
                </table>
              </div>
              {/* Row for Submit For ApprovalPage */}
              <div className="row mt-3 d-flex align-items-center justify-content-center">
                <button className="btn btn-success" onClick={this.onProceed}>
                    Proceed
                </button>
              </div>
        </div>
        {/* <hr className="border border-primary mt-4 "/> */}
        
      </Fragment>
    );
  }
}



const mapStateToProps = (state) => ({
  parts: state.parts.parts,
  buyerCode: state.parts.buyerCode,
  itemCode: state.parts.itemCode,
  selectedParts: state.parts.selectedParts,
});

export default connect(mapStateToProps, { getParts, updatePart, updateBC, updateIC, updateSParts, createMessage })(Parts);