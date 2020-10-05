FROM node:12 as build-env
WORKDIR /github-repos
ENV PATH /github-repos/node_modules/.bin:$PATH
COPY package.json yarn.lock  ./
RUN yarn global add react-scripts@3.4.3 --silent
RUN yarn --silent
COPY . ./
RUN yarn build

FROM nginx:stable-alpine
COPY --from=build-env /github-repos/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]