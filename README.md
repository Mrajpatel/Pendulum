# Pendulum

## Install Instructions
1. Download the zip files
2. Unzip the files, open the folder in terminal and run 
  `npm install`
   to install required node modules
3. Run `node index.js` in the terminal to start the server
4. Open browser and redirect to `http://localhost:3000` to see the project in action


## Walkthrough
1. Once the project is running on `http://localhost:3000`, insert pendulum attributes <br>
  a. Insert Pendulum identifier (name) along with color from color picker  <br>
  ![image](https://user-images.githubusercontent.com/34627097/214356719-2043af42-2000-4e56-849b-b606134f8207.png)  <br>
  b. Insert point of index (point at which pendulum will be suspended at)  <br>
  ![image](https://user-images.githubusercontent.com/34627097/214357018-427b11fb-082d-43be-b9f9-92ca20b752d5.png)  <br>
  c. Insert angle of start (range -90, 90)  <br>
  ![image](https://user-images.githubusercontent.com/34627097/214357231-4331488b-b12e-4493-b51b-5e7744fa9e1f.png)  <br>
  d. Insert mass of the pendulum  <br>
  ![image](https://user-images.githubusercontent.com/34627097/214357389-7655f9d9-4655-4dd0-8d8f-1aec8c994f9d.png)  <br>
  e. Insert length of the string on which pendulum is suspended  <br>
  ![image](https://user-images.githubusercontent.com/34627097/214357434-9f59a8b7-746d-48ce-8c9a-4404afcff0fb.png)  <br>
  d. Click submit button  <br>
 
 2. Under the input fields new section will appear listing the total pendulum running along with their attributes.
    ![image](https://user-images.githubusercontent.com/34627097/214358149-6f3df311-a73b-4df6-a529-7d29b43ddc2c.png) <br>
    It will also have the action buttons (Stop, Pause and Start) <br>
    
    <b>Stop:</b> Will stop all the pendulum that are running <br>
    <b>Pause:</b> Will pause the pendulum that are running <br>
    <b>Start:</b> Will pause the pendulum that are running <br>
  
 3. In Canvas the running pendulum is displayed
    ![image](https://user-images.githubusercontent.com/34627097/214359822-f6fcaba7-c71e-4c67-ad7c-724fe50eb154.png)

 5. Multiple Pendulum can be inserted following the process in step 1
    ![image](https://user-images.githubusercontent.com/34627097/214361680-35624955-8027-4fca-90d1-261988e0ff98.png)

 6. Collision: When 2 pendulum are at a collision distance or did collide they will stop running and a "STOP" message will be sent to the index.js server (on a "Status" socket channel) and after 5 second when server sends "RESTART" message to the client (on the same "Status" socket channel) instructing pendulums to start running from their original postion (starting point) <br>
 ![image](https://user-images.githubusercontent.com/34627097/214360879-8cb5f7ea-f731-459f-8d44-e2c03b963b83.png)


  
