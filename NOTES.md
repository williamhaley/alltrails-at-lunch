# Notes

## Open Ended Questions/Assumptions

The exercise description and designs seem ambiguous (I'd assume, purposefully) in a few aspects. Also, these are my general notes and thoughts while working.

- When clicking "Filter" it changes to "Sort". Is it truly a filter or a sort?
- Is it assumed we prompt users for their current location/location API usage? If not, how does the app gracefully fall back?
- Is there an ideal Places API for the types of searches we want? Do we want to search on terms like "Pizza" and find best-matches based purely on proximity? Seems reasonable considering it's a hiking-related app! We probably want walking distance.
- Do we think autocomplete is valuable? Probably, but wouldn't that be cleaner for mobile in its own UI? The designs don't represent that possible state.
- How do we want to handle loading/error states?
- Do we want service workers for offline graceful fallback?
- Is there a given pattern library in use? Off-hand I see hints of Bootstrap, but I haven't dug in deep. Seems like prod uses component modules at least, but what about global themes?
- How should we handle no results found?
- I don't know that I've used the Places API before. I've used Maps, but the coupling between things is pretty tight and an interesting challenge for React where, ideally, we're not passing around `$map` references left and right.
- I should start with the happy path, because there are lots of places for rich user interaction and edge case handling.
- Centering the map, showing pinpoints, performing reasonable searches, are all heavily dependent on the app having a location.
- Should probably disable search if the places API is slow so we don't have multiple async requests in-flight.
- Bootstrap is a nice fit, but not everything is pixel-perfect for the design and I question taking the time to make it so.
- The scratch file has some styles that are helpful, but also static images. I wonder how in-depth I'm meant to dig.
- I'd rather leave button borders on focus/active for accessibility than match the design.
- Sorting by ratings ascending seems like an odd business choice.
- Shouldn't we include an address or the phone number since it's mobile? I'd think so, but I don't want to deviate from the exercise.
- Pagination would be a nice-to-have. Infinite scrolling.
- The "desktop" viewport in the designs looks like an iPad. A fixed height app seems appropriate.
- I haven't done a from-scratch redux project in a little while. Really opionated and less "simple", but also seems to abstract away some boilerplate, which is nice. Hopefully not a mistake on my part!
