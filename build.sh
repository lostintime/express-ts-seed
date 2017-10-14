#!/bin/sh

REVISION=`git rev-parse --short HEAD`

export NODE_ENV=production

# Build project, generate assets
npm run-script clean
npm run-script build

docker build --build-arg "NODE_ENV=production" -t "lostintime/express-ts-seed:latest" $( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

docker tag "lostintime/express-ts-seed:latest" "lostintime/express-ts-seed:rev-$REVISION"

echo "Build done, to push run:"
echo "docker push lostintime/express-ts-seed:latest"
echo "docker push lostintime/express-ts-seed:rev-$REVISION"
