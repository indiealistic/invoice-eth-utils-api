# Use Node 10
FROM node:14-alpine AS build

ENV NODE_ENV production

# Create a folder for our app
RUN mkdir /app

# Set up the working directory
WORKDIR /app

# Copy our package.json file first, then run `npm install`.
# This is an optimization we can make, as this layer will be
# cached, meaning that if we don't change the package.json file,
# this step doesn't need to be performed again
COPY package.json pnpm-lock.* ./

# Note that we're installing all dependencies, unlike the buildpack
RUN curl -sL https://unpkg.com/@pnpm/self-installer | node
RUN pnpm install

COPY . ./

# ---------------

# Create a second-stage which copies the /dist folder
# and uses http-server to host the application
FROM node:14-alpine

ENV NODE_ENV production

# Create an app folder
RUN mkdir /app

# Set /app as the working directory
WORKDIR /app

# Copy the built artifacts from the build stage
COPY --from=build /app /app

# Expose port
EXPOSE 3000

# Set the startup command
CMD pnpm run start
