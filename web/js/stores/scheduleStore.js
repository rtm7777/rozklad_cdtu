import storage from "../services/localStorage";
import promise from "../libs/promise";
import dataBase from "../services/indexedDB";
import {EventEmitter} from "events";

class ScheduleStore extends EventEmitter {
	constructor(dispatcher) {
		super();
		this.state = ScheduleStore.defaultState;
		this.filtersState = ScheduleStore.defaultFiltersState;
		this.loader = true;
		this.db = dataBase;
		this.daysPairs = {};
		this.facultiesYears = {};
		this.selectedItems = [];

		dispatcher.register((action) => {
			switch(action.actionType) {
				case 'load':
					this.load().then(() => {
						this.emit('load');
						this.emit('loaderChange');
						this.emit('initialDataLoaded');
					});
					break;
				case 'loadSchedule':
					this.loadSchedule();
					break;
				case 'facultyChanged':
					this.facultyChanged(action);
					break;
				case 'yearChanged':
					this.yearChanged(action);
					break;
			}
		});
	}

	load() {
		let promises = [
			promise.get('get_faculty_list'),
			promise.get('get_days_pairs_list')
		];
		if (this.filtersState.selectedFaculty && this.filtersState.selectedYear) {
			promises.push(this.loadSchedule());
		}
		return Promise.all(promises).then((data) => {
			this.filtersState.filtersData = {
				faculties: data[0].faculties,
				years: [...Array(data[0].yearsCount).keys()].map((i) => { return {id: ++i, value: i}; })
			};
			this.daysPairs = data[1];
			this.loader = false;
		}).catch(() => {
			console.log('loading error');
		});
	}

	loadSchedule() {
		const payload = {
			facultyId: this.filtersState.selectedFaculty,
			year: this.filtersState.selectedYear
		};

		return promise.get('get_faculty_schedule', payload).then((data) => {
			return this.db.loadScheduleDetails(data).then((schedule) => {
				this.state.schedule = schedule;
			});
		});
	}

	facultyChanged({facultyId}) {
		this.filtersState.selectedFaculty = facultyId;
		storage.set('selectedScheduleFaculty', facultyId);
		this.filtersState.selectedYear = 0;
		storage.set('selectedYear', 0);

		this.emit('filterChanged');
		this.state.schedule = [];
		this.emit('load');
	}

	yearChanged({year}) {
		this.filtersState.selectedYear = year;
		storage.set('selectedYear', year);

		this.emit('filterChanged');
		this.loader = true;
		this.emit('loaderChange');
		this.state.schedule = [];
		this.loadSchedule().then(() => {
			this.emit('load');

			this.loader = false;
			this.emit('loaderChange');
		});
	}

	getState() {
		return this.state;
	}

	getFiltersState() {
		return this.filtersState;
	}

	getLoaderState() {
		return this.loader;
	}

	getDaysPairsList() {
		return this.daysPairs;
	}

	getSelectedItems() {
		return this.selectedItems;
	}

}

ScheduleStore.defaultState = {
	schedule: []
};

ScheduleStore.defaultFiltersState = {
	filtersData: {faculties: [], years: []},
	selectedFaculty: storage.get('selectedScheduleFaculty') || 0,
	selectedYear: storage.get('selectedYear') || 0
};

export default ScheduleStore;
