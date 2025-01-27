# FROM node:22
# WORKDIR /usr/src/app
# COPY api/package.json ./  # Kopiowanie package.json z folderu api
# RUN ls -al /usr/src/app   # Sprawdzenie zawartości folderu /usr/src/app
# RUN npm install
# COPY . .                   # Kopiowanie reszty plików
# EXPOSE 3000
# CMD ["node", "server.js"]


FROM node:22
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]




