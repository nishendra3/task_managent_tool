import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';


export class UnderConst extends Component {
    render() {
        return (
            <div className="container-fluid mt-4 mb-2 ">
                <div className="row">
                    <div className="col text-center pt-2">
                    <h3 className="align-center">Under Construction</h3>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    parts: state.parts.parts,
    buyerCode: state.parts.buyerCode,
    itemCode: state.parts.itemCode,
    selectedParts: state.parts.selectedParts,
  });
  
  export default connect(mapStateToProps, {  })(UnderConst);
