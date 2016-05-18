## Table Tennis Scoring

A league and fixture generator for table tennis.

Once the git hook has been copied and a league has been setup (see instructions below) then this is a push-to-deploy generated static site hosted on github pages. Perfect for keeping tabs on your office table tennis leagues.

### Getting Setup

- fork and clone this repo
- `npm i`
- `npm run add-hook`
- `rm -rf leagues/test`
- add your league scaffolding (see below)
- make sure your newly added league is marked as live (see below)
- `git push`
- goto `http://[your_github_username_here].github.io/table-tennis-scoring/
- as and when results come in, commit them (in required format, see below) and push
- your github pages site should reflect the results

### Adding A League

Coming soon

### Adding Results

- results are grouped into files that represent games played on certain dates
- results file names should be in the format of YYYYMMDD with no extension
- results file contents should be in a csv format where each row has a winner, loser and a score, in that order
- the winner and loser names must match a player added to league for it to be counted as part of the standings

### Marking A League As Live

- in `gulpfile.js` update the LIVE_LEAGUE constant to the name of the league that you want to be marked as live
- NOTE: the value must match the directory name of the selected league
