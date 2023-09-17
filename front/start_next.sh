yarn build &&
mv ./.next/standalone ./ &&
mv ./public ./standalone/ &&
mv ./.next/static ./standalone/.next/ &&

node ./standalone/server.js