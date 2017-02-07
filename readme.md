## Table Tennis Scoring

A league and fixture generator for table tennis.
This is a push-to-deploy generated static site hosted on github pages. Perfect for keeping tabs on your office table tennis leagues.

### Getting Setup

- fork and clone this repo
- `npm i`
- `npm run add-league`
- add players to your league (see below)
- `npm run choose-live`
- git commit and push
- goto `http://[your_github_username_here].github.io/table-tennis-scoring/`

### Adding Players

- players should be added to the `players` file within your selected leagues directory
- each player should be separated by a new line

### Adding Results

- `npm run add-result` - once completed, this creates/updates a results file and commits it
- `git push`

NOTE: the winner and loser names must match a player added to league for it to be counted as part of the standings

### MetaData Propeties

Add or change these values as you wish.

- displayName (required) : the front-facing name of your league
- startDate (optional) : to signify when the league is to start, displayed at the top of the league template
- endDate (optional) : to signify when the league is to end, displayed at the top of the league template
- description (optional) : a good place for stating rules etc, displayed at the top of the league template

### Update Forked Repo

Occasionally, when there has been updates in this repo, you may want to update your forked repo with the changes. To do this follow the steps below.

- `git remote add forked git@github.com:burt202/table-tennis-scoring.git`
- `git pull forked master`
- `git push`

### Example

- `npm run example` - this copies the test league into the `leagues` directory, and then builds it
- open `build/index.html` in a browser
