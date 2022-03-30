import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTimelines } from '../../actions/timelines';
import { getBundles } from '../../actions/addDetails';
import Select from 'react-select';
//import GanttInfo from './GanttInfo'

class GanttInfo extends Component {
    render() {
		
        return (
            <div>
                <div className="mt-5 pt-3">
                    <div className="row mt-1">
                        <div className="col"><h4 className="text-center">Task 1</h4></div>
                    </div>
                    <div className="row mt-1">
                        <div className="col "><h4 className="text-center">Task 2</h4></div>
                    </div>
                    <div className="row mt-1">
                        <div className="col "><h4 className="text-center">Task 3</h4></div>
                    </div>
                    <div className="row mt-1">
                        <div className="col "><h4 className="text-center">Task 4</h4></div>
                    </div>

                </div>
            </div>
        )
    }
}


export class GanttChart extends Component {
	state = {
		currentBundle:null,
		chartState:null,
	}

	gc = React.createRef();

	onChange = (e) => {
		this.setState({currentBundle:e}, ()=>{
			if(this.state.currentBundle!==null){
				this.props.getTimelines(this.state.currentBundle.value); // pass BUNDLE ID
			};
		})
	}

	onClick = () => {
		//console.log('current bundle --> ', this.state.currentBundle)
		//console.log(" current timeline ---> ",this.props.timelines)
		const { timelines } = this.props;
		//console.log(" ---> ",this.props.timelines)
		let atasks = timelines.map((t,i)=>{
			return {
				start: t.startDate,
				end: t.endDate,
				as: t.actualSD,
				ae: t.actualED,
				name: '',
				id: `Task ${i}`,
				progress: t.completion,
			}
		})
		if(atasks.length===0){
			atasks = [{
				start: '2021-06-01',
				end: '2021-06-01',
				as: '2021-06-01',
				ae: '2021-06-01',
				name: '',
				id: '1',
				progress: '0',
			}]
		}
		//console.log('tasks --> ',atasks)
		//let a = (atasks.length==0)?null
		let a = new Gantt(this.gc.current, atasks, {
			on_click: function (task) {
				//console.log(task);
			},
			on_date_change: function(task, start, end) {
				//console.log(task, start, end);
			},
			on_progress_change: function(task, progress) {
				//console.log(task, progress);
			},
			on_view_change: function(mode) {
				//console.log(mode);
			},
			view_mode: 'Month',
			language: 'en',
			
		});
		//console.log(a);

		
	}
	componentDidUpdate(){
		
		
		//console.log('component updated')

		
		//console.log('hii', this.gc.current)


		
		//this.setState({chartState:a})
		//console.log(this.state.chartState)
		//var gantt_chart = a;


	}
    
	componentDidMount(){
		this.props.getBundles();	
	}

    tasks = [
			{
				start: '2021-01-10',
				end: '2021-03-08',
				as: '2021-01-15',
				ae: '2021-03-15',
				name: '',
				id: "Task 0",
				progress: 20
			},
			{
				start: '2021-03-10',
				end: '2021-05-15',
				as: '2021-03-20',
				ae: '2021-05-10',
				name: '',
				id: "Task 1",
				progress: 5,
				// dependencies: 'Task 0'
			},
			{
				start: '2021-05-16',
				end: '2021-06-16',
				as: '2021-05-15',
				ae: '2021-07-16',
				name: '',
				id: "Task 2",
				progress: 10,
				// dependencies: 'Task 1'
			},
			{
				start: '2021-06-17',
				end: '2021-07-30',
				as: '2021-06-25',
				ae: '2021-08-15',
				name: '',
				id: "Task 3",
				progress: 20
			},

			
    ];
	
    render() {
		const { timelines, bundles } = this.props;
		const { currentBundle } = this.state;
		let b_options = bundles.filter(b=>b.timelines.length!==0).map(b=>{return {value:b.id, label:`${b.bname} : ${b.alternateVendor}`}})
		
		
        return (
            <div>
                <div className="">
					<div className="container-fluid mt-4 mb-2">
						<div className="row mb-5">
							<div className="col">
								<h2> Gantt Chart :</h2>
							</div>
							<div className="col">
								<Select 
									options={b_options}
									// value={(buyerCode==[])?null:buyerCode}
									value={currentBundle}
									onChange={ this.onChange }
									onMenuClose={this.onClick}
									closeMenuOnSelect={false}
									isSearchable
									name="currentBundle" 
									maxMenuHeight={190} 
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-2 mt-5 pt-2">
								{
									timelines.map((t,i)=>
									<div className="row mt-2 pt-1" key={i}>
										<div className="col"><h6 className="text-center">{`-- ${t.activity} --`}</h6></div>
									</div>	
									)
								}
							</div>
							<div className="col-sm-10">
								
									<div className="gc" ref={this.gc}></div>
								
							</div>
						</div>
					</div>
						
				{/* <GanttInfo /> */}
					
                </div>
            </div>
        )
    }
}

//ReactDOM.render(<GanttInfo />, document.getElementById('gantt-info'));


const mapStateToProps = (state) => ({
	timelines: state.timelines.timelines,
	bundles: state.addDetails.bundles,
  
});

export default connect(mapStateToProps, { getTimelines, getBundles })(GanttChart);