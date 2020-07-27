FROM mhart/alpine-node
COPY public .
COPY serve.js .
RUN yarn init -y
RUN yarn add express
ENV BASE_URL=https://dev-api.mykaseb.ir
ENV PUBLIC_URL=http://localhost:80
ENV PORT=80
CMD ["node", "serve.js"]