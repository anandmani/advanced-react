# advanced-react

<h1>Dev</h1>
<b>To run</b>  
yarn webpack //webpack on watch, to keep bundling on changes  
yarn test //jest   
yarn dev //pm2 start   

<b>To stop</b>  
yarn pm2 list  
yarn pm2 stop <id/name> or yarn pm2 delete <id/name>

<h1>Prod</h1>
<b>To run</b>  
yarn run-prod  


<b>To stop</b>  
yarn pm2 delete all (as there is a process for every core in the CPU)  
yarn pm2 logs  

<b>To update webpack alone</b>  
yarn build-webpack  

<b>To update node</b>  
Need to stop stop server (as pm2 isn't running in watch mode)  
yarn run-prod

