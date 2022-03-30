import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPParts, updatePart } from '../../actions/parts';
import { updateSS, updateSR, addBundle, getVcodes, getVnames, updateVcode, updateVname, updateBname } from '../../actions/addDetails';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable'
import { Fragment } from 'react';

export class AddDetails extends Component {
    state = {

        sourcingReason: null,
        ssItem: null,

        // addtitonal details - 
        // additionalDetails[0] = bundle name
        // additionalDetails[1] = alternate vendor
        // additionalDetails[2] = sourcing reason
        // additionalDetails[3] = parts in bundle
        //
        // additionalDetails[4] = alternate vendor code

        additionalDetails: ['', '', '', '', ''],
    };

    componentDidMount() {
        // get the list of parts under process for second sourcing -
        this.props.getPParts();
        this.props.getVcodes();
        this.props.getVnames();
    }

    

    onChange = (id, e) => {
        let additionalDetails = [...this.state.additionalDetails];
        additionalDetails[id] = e.target.value;
        this.setState({ additionalDetails })
    };
    onChange2 = (id, e) => {
        let additionalDetails = [...this.state.additionalDetails];
        additionalDetails[id] = e.value;
        this.setState({ additionalDetails })
    };

    onReset = () => {
        this.props.processParts.map(p => this.props.updatePart(p.id, { underProcess: false }));
        
        // clear out the form for next entry - 
        let additionalDetails = [...this.state.additionalDetails];
        additionalDetails = ['', '', '', '', '']
        this.props.updateSR(null) // set sourcing reason blank
        this.props.updateSS([]) // set second sourcing parts blank
        this.setState({ additionalDetails }); // clear out form
        this.props.updateBname(null);
        this.props.updateVname(null);
        this.props.updateVcode(null);
    }

    onSubmit = (e) => {
        e.preventDefault();


        let b = [...this.state.additionalDetails]
        const bundle = {
            bname: b[0], alternateVendor: b[1],
            sourcingReason: b[2], parts: b[3], alternateVendorCode: b[4]
        };
        this.props.addBundle(bundle);

        //console.log(bundle);

        // clear out the form for next entry - 
        let additionalDetails = [...this.state.additionalDetails];
        additionalDetails = ['', '', '', '', '']
        this.props.updateSR(null) // set sourcing reason blank
        this.props.updateSS([]) // set second sourcing parts blank
        this.setState({ additionalDetails }); // clear out form

        // clear out the process parts from the choice of available parts | available in b[3]
        // implement it on the basis of 200 OK status code
        // implemented in addDetails.js action file - 28.07.21
    };

    // sourcing reasons options list - 
    sourcingReasons = [{ value: "Lockdown", label: "Lockdown" },
    { value: "Second Sourcing Policy", label: "Second Sourcing Policy" },
    { value: "Derisking", label: "Derisking" },
    { value: "Weak Vendor", label: "Weak Vendor" },
    { value: "Quality Problem", label: "Quality Problem" },
    ]

    render() {
        const { additionalDetails } = this.state;
        const { processParts, ssParts, updateSS, sourcingReason, updateSR, vcodes, vcode, vnames, vname, bname } = this.props;

        


        // get list of unique item names under processing - 
        const filteredList = processParts
            .filter((x, i, a) => a.map(p => p.itemCode).indexOf(x.itemCode) == i);
        // .map((x,i)=> { return {value:x.id, label:`${x.itemCode} : ${x.itemName}`}})

        const items_unique = filteredList.map((x, i) => { return { value: x.id, label: `${x.itemCode} : ${x.itemName}` } });
        const bnames = filteredList.map((x, i) => { return { value: `${x.itemCode} : ${x.itemName}`, label: `${x.itemCode} : ${x.itemName}` } })
        
        

        return (
            <Fragment>
                <h2>ADD ALTERNATE VENDOR : </h2>
                <div className="container-fluid mt-4 mb-2 border border-secondary rounded p-5">
                    <div className="row">
                        <div className="col" />
                        <div className="col text-center pt-2"><label>SELECT PART(S)</label></div>
                        <div className="col-sm-6">
                            <Select
                                options={items_unique}
                                value={ssParts}
                                onChange={(e) => updateSS(e)}
                                onMenuClose={() => {
                                    if (ssParts !== null) {
                                        let additionalDetails_tmp = [...additionalDetails];
                                        //console.log(ssParts)
                                        additionalDetails_tmp[3] = ssParts.map(p => p.value);
                                        this.setState({ additionalDetails: additionalDetails_tmp });
                                    }
                                }}
                                isSearchable
                                isMulti
                                closeMenuOnSelect={false}
                                name="ssParts"
                                maxMenuHeight={190}
                            />
                        </div>
                        <div className="col" />
                    </div>
                    <div className="row">
                        <div className="card card-body mt-4 mb-4">
                            <h2>Add Details</h2>
                            <form>
                                {/* <div className="form-group">
                            <label>Bundle Name</label>
                            <input
                            className="form-control"
                            type="text"
                            name="bundleName"
                            onChange={(e)=>this.onChange(0,e)}
                            value={additionalDetails[0]}
                            />
                        </div> */}
                                <div className="form-group">
                                    <label>Bundle Name</label>
                                    <CreatableSelect
                                        isClearable
                                        value={bname}
                                        onChange={(e) => this.props.updateBname(e)}
                                        onMenuClose={() => (bname !== null ) ? this.onChange2(0, bname) : ''}
                                        options={bnames}
                                        maxMenuHeight={190}
                                    />
                                </div>


                                {/* -- input for vendor code @ index: 4 -- */}
                                {/* <div className="form-group">
                            <label>Alternate Vendor Code</label>
                            <input
                            className="form-control"
                            type="text"
                            name="alternateVendorCode"
                            onChange={(e)=>this.onChange(4,e)}
                            value={additionalDetails[4]}
                            />
                        </div> */}

                                {/* -- input for vendor code @ index: 4 -- */}
                                <div className="form-group">
                                    <label>Alternate Vendor Code</label>
                                    <CreatableSelect
                                        isClearable
                                        value={vcode}
                                        onChange={(e) => this.props.updateVcode(e)}
                                        onMenuClose={() => (vcode !== null) ? this.onChange2(4, vcode) : ''}
                                        options={vcodes}
                                        maxMenuHeight={190}
                                    />
                                </div>
                                {/* -- input for vendor name @ index: 1 -- */}
                                <div className="form-group">
                                    <label>Alternate Vendor</label>
                                    <CreatableSelect
                                        isClearable
                                        value={vname}
                                        onChange={(e) => this.props.updateVname(e)}
                                        onMenuClose={() => (vname !== null) ? this.onChange2(1, vname) : ''}
                                        options={vnames}
                                        maxMenuHeight={190}
                                    />
                                </div>

                                {/* <div className="form-group">
                            <label>Alternate Vendor</label>
                            <input
                            className="form-control"
                            type="text"
                            name="alternateVendor"
                            onChange={(e)=>this.onChange(1,e)}
                            value={additionalDetails[1]}
                            />
                        </div> */}

                                <div className="form-group">
                                    <label>Sourcing Reason</label>
                                    <Select
                                        options={this.sourcingReasons}
                                        value={sourcingReason}
                                        onChange={(e) => updateSR(e)}
                                        onMenuClose={() => {
                                            let additionalDetails_tmp = [...additionalDetails];
                                            additionalDetails_tmp[2] = (sourcingReason == null) ? sourcingReason : sourcingReason.value;
                                            this.setState({ additionalDetails: additionalDetails_tmp });
                                        }}
                                        isSearchable
                                        name="sourcing reasons"
                                    />
                                </div>

                                <div className="form-group">
                                    {/* <button onClick={this.onSubmit} className="btn btn-primary">
                                        Submit
                                    </button> */}
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Row for Submit For ApprovalPage */}
                    <div className="row mt-5 d-flex align-items-center justify-content-center">
                        
                        <button className="btn btn-secondary mr-4" onClick={this.onReset}>
                            Reset
                        </button>
                        <button onClick={this.onSubmit} className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    processParts: state.parts.processParts,
    ssParts: state.addDetails.ssParts,
    sourcingReason: state.addDetails.sourcingReason,
    vcodes: state.addDetails.vcodes,
    vnames: state.addDetails.vnames,
    vcode: state.addDetails.vcode,
    vname: state.addDetails.vname,
    bname: state.addDetails.bname,
});

export default connect(mapStateToProps, { getPParts, updatePart, updateSS, updateSR, addBundle, getVcodes, getVnames, updateVcode, updateVname, updateBname })(AddDetails);