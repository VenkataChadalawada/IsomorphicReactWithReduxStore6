# IsomorphicReactWithReduxStore6
So To do the first step
Figure out what components would have rendered - We are going to use
`React-router-config` library. This library is a sub part of the `react-router`
With the use of this library we gonna structure out our routes in a Json way
With that we change it in both Client.js and renderer.js with <div>{ renderRoutes(Routes) }</div>
Also we need to know the path request is coming from for our second step load that particular route data 
Hence , on our main index.js we use matchRoutes method from the mentioned library console.log('=======',matchRoutes(Routes, req.path)); //

So,
First ,
We need to fetchdata & populate store and pass it to renderer 
``` javascript app.get('*', (req,res) => {
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
```
In order to get this done we need a helper function in client that manually fires actioncreators
Eg:
``` javascript
function loadData(store){
   //console.log('im trying to load some data');
   return store.dispatch(fetchUsers());
}
```
