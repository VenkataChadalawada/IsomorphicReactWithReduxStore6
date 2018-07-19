import 'babel-polyfill';
import express from 'express';
import renderer from './helpers/renderer';
import { matchRoutes } from 'react-router-config';
import Routes from './client/Routes';
import createStore from './helpers/createStore';
const app = express();
app.use(express.static('public'));

// divert all the requests from express route handler to React Router handler
app.get('*', (req,res) => {
    const store = createStore();
    // console.log('---server store', store);
    const promises = matchRoutes(Routes, req.path).map(({ route }) => {
        return route.loadData ? route.loadData(store) : null;
    });
    console.log('---',promises); // o/p:--- [ Promise { <pending> } ] ->  beacuse this will be a Promise
    Promise.all(promises).then(() => {
        res.send(renderer(req, store));
    });  
});
app.listen(3000, () => {
    console.log('Listening on port 3000');
});