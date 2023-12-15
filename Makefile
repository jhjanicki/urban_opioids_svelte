src/assets/data/counties_topo.json: data/output/cb_2020_us_county_500k/cb_2020_us_county_500k.shp
	mkdir -p $(dir $@)
	npx mapshaper $^ \
		-rename-layers counties \
		-filter '"26,34".indexOf(STATEFP) > -1' \
		-each 'this.properties={id: this.properties.GEOID, stateID: STATEFP, name: NAME, stateName: STATE_NAME}' \
		-proj webmercator \
		-clean \
		-simplify visvalingam 25% \
		-o format=topojson id-field=id $@
	touch $@

data/output/cb_2020_us_county_500k/cb_2020_us_county_500k.shp: data/output/cb_2020_us_county_500k.zip
	mkdir -p $(dir $@)
	unzip -o $^ -d $(dir $@)
	touch $@

data/output/cb_2020_us_county_500k.zip:
	mkdir -p $(dir $@)
	curl -o $@ -L https://www2.census.gov/geo/tiger/GENZ2020/shp/cb_2020_us_county_500k.zip
	touch $@

