//also need it in the dropdown menu
export const moveToFront = (feature, allCounties) => {
	//find selected county, then sort $countiesData and put it as the last feature
	let counties = allCounties.filter(
		(d) => d.properties.name != feature.properties.name
	);
	counties.push(feature);
	return counties;
};
