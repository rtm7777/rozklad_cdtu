/** @jsx */
import React from "react";
import ScheduleStore from "../../stores/scheduleStore";
import I18n from "../../services/i18n";

const DayCol = (props) => {
	return <div className='day-cell'>{props.day}</div>;
};

const PairCol = (props) => {
	return (
		<div className='pair-row'>
			<div className='pair-cell'>{props.number}</div>
		</div>
	);
};

class DaysPairsRows extends React.Component {
	static contextTypes = {
		store: React.PropTypes.instanceOf(ScheduleStore).isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			daysPairsList: {days: [], pairs: []}
		};
	}

	componentWillMount() {
		let store = this.context.store;
		store.on('initialDataLoaded', () => {
			this.setState({daysPairsList: store.getDaysPairsList()});
		});
	}

	generatePairsCols() {
		return this.state.daysPairsList.pairs.map(({number, id}) => {
			let props = {
				number: number,
				key: id
			};

			return <PairCol {...props}/>;
		});
	}

	generateDaysCols() {
		const pairs = this.generatePairsCols();
		return this.state.daysPairsList.days.map(({day, id}) => {
			let props = {
				day: I18n.t(day),
				key: id
			};


			return (
				<div className='day' key={id}>
					<div className='day-col'>
						<DayCol {...props}/>
					</div>
					<div className='pair-col'>
						{pairs}
					</div>
				</div>
			);
		});
	}

	render() {
		const days = this.generateDaysCols();

		return (
			<div className='days-pairs-container'>
				<div className='day'>
					<div className='day-col'>
						<div className='day-cell'></div>
					</div>
					<div className='pair-col'>
						<div className='pair-row'></div>
					</div>
				</div>
				{days}
			</div>
		);
	}
}

export default DaysPairsRows;
