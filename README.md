# Response to the Task

Please read below to see what I have implemented for the given task. I've also tried to list further improvements.

## Implementation

In this section, I'll try to list all the actions I took for the given task so that the reviewer can get a clear picture of my approach:

1. Cloned both repositories and merged them into a single repository with subfolder structure
2. Decided to implement task 2 and added a new responsive navigation item "Map View"
3. Added tests for the navigation item
4. Run `yarn test` and found out the problem about prettier formatter.
5. `yarn test` documentation was missing an explanation about prettier formatter, I've added it in the task's README.md
6. To add the "NEW MAP VIEW" title on the new page, I parametrized AppMobileHeader and RadarView so that they change according to a new props called
headingLabel and added tests for this
7. Added RadarMap and RadarMapView that will contain the related components.
8. Added react-google-maps dependency to be able to embed a map. The choice of google maps is solely random.
Any other map could have been used.

`yarn add @react-google-maps/api`

9. Updated library version to the latest to be able to use some new properties like Radar height&width:

`"@undp_sdg_ai_lab/undp-radar": "1.1.0"`

10. Used google maps react component in MapView component:
- iterate through the Radar state blips and map them to the country hashmap with their frequencies
- according to the frequency, set marker's transparency: bolder meaning more, more pale meaning less

11. Added info window for each marker. When you click on any of the markers, it shows which country it belongs to as well as the total number of
implementations for that country.

12. Added QuadrantMapView so that when we are in the new map view and user clicks a quadrant, this new components shows a map filtered by the
values of the quadrant (technology filter included)

13. Added 'quadrant-filter' class for mobile viewports too so that the new map view can have the responsive filter on mobile

14. Added tests for MapView

15. Moved Google Maps API Key to .env.local which prevents it from being committed to Github.
Github workflows still work since API key is in Github secrets now.


## Available Scripts

The app can be built/run as the same way described in the relevant README.me files of the subprojects.

# Demo

Using the github workflow in the project, I integrated my repo with github pages, thus the result can be seen at:
https://halilturkoglucs.github.io/

NOTE: When you filter data sometimes the filtered data is somewhere up or down the current map view, please pan/scroll 
on the map to find filtered blips

NOTE 2: If you need to run it locally, please provide REACT_APP_GOOGLE_MAPS_API_KEY in .env.local so that the map can load
If no API key is handy, please contact me so that I can provide you

# Further Steps

1. There may be more tests added

2. For the info windows of the markers on the map we show some metadata about implementations. 
However, please be aware that the blip locations, as far as I can see, differ from the country of implementation. 
Thus, they may appear somewhere else than their country of implementation according to the radar data.
To overcome this, maybe we could be using static country lat&longs for this if we wanted to avoid it or manually fix the lat&long data of CSV.
e.g. there is a project of Sudan at coordinates x: 44.47583058885326, y: -39.80846570525004 but this is nowhere near Sudan.

3. I've realised that blip's Technology field and the techFilters sent by Radar state is different
    e.g. blip.Technology=['Geographical Information Systems'] 
    whereas techFilters=['geographical-information-systems']. These may use Ids instead
	
4. The new component I added (QuadrantMapView) shows a map next to the quadrant. However, when we click the back arrow, it navigates back to 
the radar view. To resolve this, I could a props to QuadrantRadar component in the library that can parametrize the page the back arrow button points to.

5. I realised a bug: the filter component on the top right of the page resets Parameters filters when you click on it after selecting a parameter filter
This may be fixed on the filter component

6. Reused SearchResult component for the task's last step (slider). However, added pageSize props to SearchResult so that I can set desired page
size which makes it seem more like a slider rather than a search results page.
