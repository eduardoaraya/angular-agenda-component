import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-calendaraya',
	templateUrl: './calendaraya.component.html',
	styleUrls: ['./calendaraya.component.scss'],
})
export class CalendarayaComponent implements OnChanges {


	@Input() currentDate: Date = new Date;
	@Input() weeksOn:any = [0,0,0,0,0,0,0];
	@Input() label:string = 'Calendário';
	@Input() showLabel:boolean = true;
	@Input() showModal:boolean = false;
	@Output() selectDate = new EventEmitter;

	calendar: any;
	nameWeekDays: any[] = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
	month: any[] = ['Janeiro', 'Fevreiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
	weekDays: any[];


	constructor() {
	}


	ngOnChanges(changes: SimpleChanges) {
		if (changes.currentDate) {
			this.renderCalendar();
		}
	}


	async initWeekDays(date: any) {

		let currentNow = await new Date();

		const callback = await this.nameWeekDays
			.map((item, index) => {

				let now = new Date(date),
					day: any = now.getDate(),
					position = now.getDay() - index,
					week_day = this.nameWeekDays[index]
					day = new Date(now.setDate(day - position));

				return {
					week_day,
					day: day.getDate(),
					dateFormat: day.toDateString(),
					time: day.getTime(),
					selected: ( (day.toDateString() == this.currentDate.toDateString()) &&  this.weeksOn[index] != 0) ? true : false,
					selectedError: ( (day.toDateString() == this.currentDate.toDateString()) && this.weeksOn[index] == 0) ? true : false,
					disabled: ( (this.weeksOn[index] != 0 ) && ( day.getTime() > currentNow.getTime() ) ) ? false : true
				};
			})

		return callback;

	}


	async setWeekDay(dateFormat: string) {
		return this.initWeekDays(dateFormat)
			.then((res: any) => this.weekDays = res)
			.catch(error => console.log(error));
	}


	async initCalendar(date: any) {

		const calendar: any[] = [];
		let count = 1,
			current: any = new Date(date),
			rowsCalendar = 5;

		for (let x = 0; x < rowsCalendar; x++) {

			current = current.setDate(count);
			current = new Date(current);
			await this.initWeekDays(current).then(res => calendar.push(res))
			count = count + 7;

			if (calendar[0][0].day < 28 && calendar[0][0].day != 1)
				rowsCalendar = 6

		}

		return calendar;
	}


	renderCalendar() {
		this.initCalendar(this.currentDate.getTime())
			.then(res => this.calendar = res)
			.catch(error => console.log(error))

	}


	async prev(target) {
		let date: any = new Date(target);
		date = date.setMonth(date.getMonth() - 1);

		this.currentDate = new Date(date);
		this.renderCalendar();
		// this.selectDay({
		//   time: this.currentDate.getTime(),
		//   date: this.currentDate.toDateString(),
		// })
	}


	async next(target) {
		let date: any = new Date(target);
		date = date.setMonth(date.getMonth() + 1);

		this.currentDate = new Date(date);
		this.renderCalendar();
		// this.selectDay({
		//   time: this.currentDate.getTime(),
		//   date: this.currentDate.toDateString(),
		// })
	}


	selectDay(date) {
		const currentDate = new Date(date.time);
		this.currentDate = currentDate;
		this.selectDate.emit({ time: date.time, date: date.dateFormat });
		this.renderCalendar();
	}


}
