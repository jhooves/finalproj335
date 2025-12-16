Submitted by: John Heuver (jheuver)

Group Members: John Heuver (jheuver)

App Description: Users submit a city + short note; the server fetches live weather from Open‑Meteo and stores/retrieves notes in MongoDB.

YouTube Video Link: (add link)

APIs: Open‑Meteo Geocoding API (https://open-meteo.com/en/docs/geocoding-api), Open‑Meteo Forecast API (https://open-meteo.com/en/docs)

Contact Email: jheuver@terpmail.umd.edu

Deployed App Link: (add link)

---

## Run Locally

1) Create `.env` from `.env.example` and set `MONGODB_URI`.

2) Install and run:

```zsh
cd /Users/johnheuver/webdev/final_proj
npm install
npm start
```

Open `http://localhost:3000`.

## MongoDB Atlas: getting `MONGODB_URI`

1) Create a project + cluster at https://cloud.mongodb.com/
2) **Database Access** → add a database user (username + password).
3) **Network Access** → add your current IP (or `0.0.0.0/0` temporarily while developing).
4) Your cluster → **Connect** → **Drivers** → copy the connection string.
5) Replace `<password>` and set it as `MONGODB_URI` in `.env`, e.g.

```
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@YOURCLUSTER.mongodb.net/weather_notes?retryWrites=true&w=majority
```
