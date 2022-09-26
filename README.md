# op3-viewer

This is a quick proof-of-concept to visualise a podcast's download numbers
using the [OP3 API](https://op3.dev/). The goal is to improve this as the
API matures and use it as a test ground.

Note that (1) it doesn't do anything clever with the range header yet,
(2) by default it looks back at the past seven days and (3) it's limited to
display a maximum of 1000 downloads by the API.

## Try it

🔗 https://op3-viewer.vercel.app

## Run locally

```sh
# Install dependencies
yarn

# Run the development server
yarn dev
```

Then go to https://localhost:3001
