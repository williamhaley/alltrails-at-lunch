# Notes

## Observations

- I don't know that I've used the Places API before. I've used Maps, but the coupling between things is pretty tight and an interesting challenge for React where, ideally, we're not passing around `$map` references left and right.
- I should start with the happy path, because there are lots of places for rich user interaction and edge case handling.
- Centering the map, showing pinpoints, performing reasonable searches, are all heavily dependent on the app having a location.
- Should probably disable search if the places API is slow so we don't have multiple async requests in-flight.

## Open Ended Questions/Assumptions

The exercise description and designs seem ambiguous (I'd assume, purposefully) about a few aspects.

- When clicking "Filter" it changes to "Sort". Is it truly a filter or a sort?
- Is it assumed we prompt users for their current location/location API usage? If not, how does the app gracefully fall back?
- Is there an ideal Places API for the types of searches we want? Do we want to search on terms like "Pizza" and find best-matches based purely on proximity? Seems reasonable considering it's a hiking-related app! We probably want walking distance.
- Do we think autocomplete is valuable? Probably, but wouldn't that be cleaner for mobile in its own UI? The designs don't represent that possible state.
- How do we want to handle loading/error states?
- Do we want service workers for offline graceful fallback?
- Is there a given pattern library in use? Off-hand I see hints of Bootstrap, but I haven't dug in deep. Seems like prod uses component modules at least, but what about global themes?
- How should we handle no results found?
