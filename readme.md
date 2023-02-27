# Simple GitHub Repo Stats Generator

This is a super simple, quickly thrown together, GitHub repo stats generator. 

### Usage

```bash
# Copy and fill config.js with your Github auth token
# and repo details.
cp config.example.js config.js

# Install JS Deps
npm install

# Generate data
node index.js
```

Then open the `index.html` file in public.

Set `NODE_ENV=dev` before/when running to cache fetched GitHub data for development purposes. 

### Attribution

- [Chart.js](https://www.chartjs.org/)
- [tailwind CSS](https://tailwindcss.com/)
- [Octokit/rest.js](https://github.com/octokit/rest.js#readme)

### Low Maintenance Project

This is a low maintenance project. The scope of features and support are purposefully kept narrow for my purposes to ensure longer term maintenance is viable. I’m not looking to grow this into a bigger project at all.

Issues and PRs raised for bugs are perfectly fine assuming they don’t significantly increase the scope of the project. Please don’t open PRs for new features that expand the scope.