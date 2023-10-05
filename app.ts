import {concatMap, filter, interval, map, switchMap, takeWhile} from "rxjs";

const names = ['Gideon', 'Justin', 'Ferdi', 'Vlinder'];
interval(1000)
	.pipe(
		takeWhile(x => x < names.length),
		map((x) => names[x]),
		filter(x => x.length > 2),
		concatMap(x => fetch("https://api.nationalize.io?name=" + x)),
		switchMap(x => x.json()),
		map(x => ([x.name, x.country[0].country_id])),
		map(([name, country]) => `${name} komt waarschijnlijk uit ${country}`)
	)
	.subscribe((x) => console.log(x));

