import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { getAllParts, mergeParts } from '../../actions/allParts';

import ReactExport from 'react-export-excel';



export class GetReport extends Component {
    state = {
        downloadBtn: false,
    };
    


    componentDidMount(){
        this.props.getAllParts();
    }
    onClick = () => {
        this.props.mergeParts();
        this.setState({downloadBtn:true});
    }
    
    renderDummy() {
        return <div></div>;
      }
        
    renderExcelDownload(x) {
        const ExcelFile = ReactExport.ExcelFile;
        const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
        const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
        console.log(' -- ',x)
    return (
        <div>
        <ExcelFile element={<button>Download</button>}>
            <ExcelSheet dataSet={x} name="SS"/>
        </ExcelFile>
        </div>
    );
    }

    render() {
        
        const { allparts, alltimes, allbundles, alldata } = this.props;
        // const { downloadBtn } = this.state;

        // const ExcelFile = ReactExport.ExcelFile;
        // const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
        // const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
        let timelinesList = [ 'RFQ Issue', 'Tech Review', 'LOI Ringi', 'LOI Issue', 'Spec Meeting', 'Sample Submission' , 'Part Fitment', 'SOP Done'];
        
        
        // const csvEmptyData = [
        //     {
        //       foo: "bar"
        //     }
        //   ];
          
          
        // const data = (downloadBtn)?[
        //     {
        //       xSteps: 7,
        //       columns: [
        //         { title: "Current Source" }
        //       ],
        //       data: csvEmptyData.map((record, index) => {
        //         return [
        //           { value: record.foo }
        //         ];
        //       })
        //     },
        //     {
        //         xSteps: 1,
        //         columns: [
        //           { title: "RFQ Issue" }
        //         ],
        //         data: csvEmptyData.map((record, index) => {
        //           return [
        //             { value: record.foo }
        //           ];
        //         })
        //      },
        //      {
        //         xSteps: 6,
        //         columns: [
        //           { title: "Tech Review" }
        //         ],
        //         data: csvEmptyData.map((record, index) => {
        //           return [
        //             { value: record.foo }
        //           ];
        //         })
        //      },
        //      {
        //         xSteps: 3,
        //         columns: [
        //           { title: "LOI Ringi" }
        //         ],
        //         data: csvEmptyData.map((record, index) => {
        //           return [
        //             { value: record.foo }
        //           ];
        //         })
        //      },
        //      {
        //         xSteps: 3,
        //         columns: [
        //           { title: "LOI Issue" }
        //         ],
        //         data: csvEmptyData.map((record, index) => {
        //           return [
        //             { value: record.foo }
        //           ];
        //         })
        //      },
        //      {
        //         xSteps: 3,
        //         columns: [
        //           { title: "SPEC Meeting" }
        //         ],
        //         data: csvEmptyData.map((record, index) => {
        //           return [
        //             { value: record.foo }
        //           ];
        //         })
        //      },
        //      {
        //         xSteps: 3,
        //         columns: [
        //           { title: "Sample Submission" }
        //         ],
        //         data: csvEmptyData.map((record, index) => {
        //           return [
        //             { value: record.foo }
        //           ];
        //         })
        //      },
        //      {
        //         xSteps: 3,
        //         columns: [
        //           { title: "Part Fitment" }
        //         ],
        //         data: csvEmptyData.map((record, index) => {
        //           return [
        //             { value: record.foo }
        //           ];
        //         })
        //      },
        //      {
        //         xSteps: 3,
        //         columns: [
        //           { title: "SOP Done" }
        //         ],
        //         data: csvEmptyData.map((record, index) => {
        //           return [
        //             { value: record.foo }
        //           ];
        //         })
        //      },
        //      {
        //         xSteps: 3,
        //         columns: [
        //           { title: "Selected Vendor" }
        //         ],
        //         data: csvEmptyData.map((record, index) => {
        //           return [
        //             { value: record.foo }
        //           ];
        //         })
        //      },
        //     {
        //       ySteps: -1,
        //       columns: [
        //         { title: "S.NO." },
        //         { title: "DIVISON" },
        //         { title: "DEPARTMENT" },
        //         { title: "ROOT PART" },
        //         { title: "ITEM CODE" },
        //         { title: "PART NAME" },
        //         { title: "BUNDLE NAME" },
        //         { title: "VENDOR CODE" },
        //         { title: "VENDOR NAME" },
        //         { title: "PLANNED START" },
        //         { title: "PLANNED END" },
        //         { title: "ACTUAL START" },
        //         { title: "ACTUAL END" },
        //         { title: "PLANNED START" },
        //         { title: "PLANNED END" },
        //         { title: "ACTUAL START" },
        //         { title: "ACTUAL END" },
        //         { title: "PLANNED START" },
        //         { title: "PLANNED END" },
        //         { title: "ACTUAL START" },
        //         { title: "ACTUAL END" },
        //         { title: "PLANNED START" },
        //         { title: "PLANNED END" },
        //         { title: "ACTUAL START" },
        //         { title: "ACTUAL END" },
        //         { title: "PLANNED START" },
        //         { title: "PLANNED END" },
        //         { title: "ACTUAL START" },
        //         { title: "ACTUAL END" },
        //         { title: "PLANNED START" },
        //         { title: "PLANNED END" },
        //         { title: "ACTUAL START" },
        //         { title: "ACTUAL END" },
        //         { title: "PLANNED START" },
        //         { title: "PLANNED END" },
        //         { title: "ACTUAL START" },
        //         { title: "ACTUAL END" },
        //         { title: "PLANNED START" },
        //         { title: "PLANNED END" },
        //         { title: "ACTUAL START" },
        //         { title: "ACTUAL END" },
        //         { title: "VENDOR CODE" },
        //         { title: "VENDOR NAME" },
        //         { title: "LOI RINGI NUMBER" },
        //         { title: "LOI NUMBER" },
        //         { title: "TEST MODEL" }

        //       ],
        //       data: alldata.map((record, index) => {
        //         return [
        //           { value: record.id },
        //           { value: record.div },
        //           { value: record.dept },
        //           { value: record.rootPart },
        //           { value: record.itemCode },
        //           { value: record.itemName },
        //           { value: record.vcode },
        //           { value: record.vname },
        //           { value: record.bname },
        //           { value: record.p_0_sd },
        //           { value: record.p_0_ed },
        //           { value: record.a_0_sd },
        //           { value: record.a_0_ed },
        //           { value: record.p_1_sd },
        //           { value: record.p_1_ed },
        //           { value: record.a_1_sd },
        //           { value: record.a_1_ed },
        //           { value: record.p_2_sd },
        //           { value: record.p_2_ed },
        //           { value: record.a_2_sd },
        //           { value: record.a_2_ed },
        //           { value: record.p_3_sd },
        //           { value: record.p_3_ed },
        //           { value: record.a_3_sd },
        //           { value: record.a_3_ed },
        //           { value: record.p_4_sd },
        //           { value: record.p_4_ed },
        //           { value: record.a_4_sd },
        //           { value: record.a_4_ed },
        //           { value: record.p_5_sd },
        //           { value: record.p_5_ed },
        //           { value: record.a_5_sd },
        //           { value: record.a_5_ed },
        //           { value: record.p_6_sd },
        //           { value: record.p_6_ed },
        //           { value: record.a_6_sd },
        //           { value: record.a_6_ed },
        //           { value: record.p_7_sd },
        //           { value: record.p_7_ed },
        //           { value: record.a_7_sd },
        //           { value: record.a_7_ed },
        //           { value: record.avcode },
        //           { value: record.avname },
        //           { value: record.rnumber },
        //           { value: record.lnumber },
        //           { value: record.tmodel }

        //         ];
        //       }),
        //     }
            
        // ]:[];
        



        return (
            <div>
                <h4> :: Summary Report :: </h4>
                {/* <button onClick={this.onClick}>Get Parts</button> */}
                {/* {(data.length===0)?this.renderDummy():this.renderExcelDownload(data)} */}

                <div className="scrollme">
                <table className="table table-responsive mt-4 mb-2 p-5 border border-secondary rounded">
                    <thead>
                    <tr className="text-center pb-4">
                        <th>S.NO.</th>
                        <th>DIV</th>
                        <th>DEPT</th>
                        <th>ROOT PT</th>
                        <th>ITEM CODE</th>
                        <th>PART NAME</th>
                        <th>BUNDLE NAME</th>
                        <th>SOURCING REASON</th>
                        <th>
                            CURRENT SOURCE
                            
                            <table>
                            <thead>
                            <tr>
                                <th>V CODE</th>
                                <th>V NAME</th>
                            </tr>
                            </thead>
                            </table>
                        </th>
                        {
                            timelinesList.map((tl,k)=>

                                <th key={k}>
                                    {tl}
                                    {/* <hr /> */}
                                    <table>
                                    <thead>
                                    <tr>
                                        <th>P-START</th>
                                        <th>P-END</th>
                                        <th>A-START</th>
                                        <th>A-END</th>
                                    </tr>
                                    </thead>
                                    </table>
                                </th>
                            )
                        }
                        
                        
                        <th>
                            SELECTED VENDOR
                            {/* <hr /> */}
                            <table>
                            <thead>
                            <tr>
                                <th>V CODE</th>
                                <th>V NAME</th>
                            </tr>
                            </thead>
                            </table>
                        </th>
                        <th>LOI RINGI NO</th>
                        <th>LOI NUMBER</th>
                        <th>TEST MODEL</th>
                    </tr>
                    </thead>
                    <tbody>
                    {   (allbundles.length!==0 && allparts.length!==0 && alltimes.length!==0 && allparts.length===allbundles.length && alltimes.length===allbundles.length)?
                        allbundles.map((b,i)=>
                            allparts[i].map((p,j)=>
                            <tr className="text-center pb-4" key={i+j}>
                                <td className="count"></td>
                                <td>ADM</td>
                                <td>{p.dept}</td>
                                <td>{p.rootPart}</td>
                                <td>{p.itemCode}</td>
                                <td>{p.itemName}</td>
                                <td>{allbundles[i].bname}</td>
                                <td>{allbundles[i].sourcingReason}</td>
                                <td>
                                    <table>
                                        <tbody>
                                            <tr>
                                            <td>{p.vendorCode}</td>
                                            <td>{p.vendorName}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                {   
                                    
                                   timelinesList.map((tl,k)=>
                                        (alltimes[i].filter(t=>t.activity===tl).length>0)?
                                        alltimes[i].filter(t=>t.activity===tl).map(a=>
                                            
                                            <td key={k}>
                                                <table>
                                                <tbody>
                                                <tr>
                                                    <td>{a.startDate}</td>
                                                    <td>{a.endDate}</td>
                                                    <td>{a.actualSD}</td>
                                                    <td>{a.actualED}</td>
                                                </tr>
                                                </tbody>
                                                </table>
                                            </td>
                                            

                                    ):
                                            <td key={k}>
                                                <table>
                                                <tbody>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                </tbody>
                                                </table>
                                            </td>
                                    )
                                }
                                
                                <td>
                                    <table>
                                        <tbody>
                                            <tr>
                                            <td>{allbundles[i].alternateVendorCode}</td>
                                            <td>{allbundles[i].alternateVendor}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td>{allbundles[i].ringiNumber}</td>
                                <td>{allbundles[i].loiNumber}</td>
                                <td>{allbundles[i].testModel}</td>
                                        
                                         
                                    
                            
                                
                            </tr>
                            ) ):<></>
                    
                    }
                    </tbody>
                    
                    
                    
                </table>
                </div>
                
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    allparts:state.allParts.allparts,
    alltimes:state.allParts.alltimes,
    allbundles:state.allParts.allbundles,
    alldata:state.allParts.alldata,
  });
  
export default connect(mapStateToProps, { getAllParts, mergeParts })(GetReport);
