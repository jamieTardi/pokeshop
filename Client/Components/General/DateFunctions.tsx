export const monthChecker = (date: any) => {
	const dateTime = date;
	const parts = dateTime.split(/[- :]/);

	var month = parts[1];
	var year = parts[0];

	var currentdate = new Date();
	var cur_month = currentdate.getMonth() + 1;
	var cur_year = currentdate.getFullYear();

	if (cur_month == month && year == cur_year) {
		return true;
	}
};
