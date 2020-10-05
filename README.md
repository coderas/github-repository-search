# GitHub Repository Search

_Bootstrapped using [`create-react-app`](https://create-react-app.dev/docs/getting-started/) - with the TypeScript template_

## Getting Started

This application will need GitHub authentication. In order to achieve this, it might be easiest to [generate a new personal access token](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token), and then run the following replacing `XYZABC123` with your copied token:

```
echo REACT_APP_GITHUB_ACCESS_TOKEN=XYZABC123 > .env.local
```

### Useful Scripts (Some come as standard with CRA)
- yarn storybook: I tend to use storybook for development workflow, and also for visual regression testing 
- yarn start: runs CRA usual dev tooling 
- yarn build: builds deployment artefacts
- yarn test: runs jest test and, with that, storyshots
- yarn lint: runs tslint 
