FROM mhart/alpine-node
RUN yarn global add serve
COPY public .
CMD ["serve", "-p", "80", "-s", "."]