FROM "node:11.1"
LABEL maintainer="pascal.liniger@infix.ch"
WORKDIR /var/node
COPY ./ ./

RUN yarn
RUN yarn nuxt build
EXPOSE 3000

CMD ["yarn", "nuxt", "start", "--hostname", "0.0.0.0"]
