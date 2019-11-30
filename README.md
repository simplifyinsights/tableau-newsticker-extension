# Tableau Newsticker Extension

The Tableau Newsticker Extension was built to provide an interesting way to present key information to your end users.

Version History
- 30-Nov-2019: Initial Commit of the Skeleton Extension

# Install Guide
- Install Node.js and NPM
- Install Yarn
- Install Git

Once installed, clone this repository:
```sh
$ git clone https://github.com/tableaumagic/tableau-datatables-extension.git
```
run the following yarn command:
```sh
$ yarn install
```

Install http-server
```sh
$ npm install http-server -g
```

Run the http-server
```sh
$ http-server
```

Open the trex file in Tableau Desktop 2018.2 or greater and enjoy.

# Usage

- Create a new Tableau Workbook
- Create a worksheet with your required data
- Create a dashboard and drag in the Worksheet as well as the Extension
- Configure the Extension to use data from the worksheet.

# Credit

- The heart of the funcitonality comes from jQuery.jConveyorTicker by Luis Luiz: https://lluz.github.io/jquery.jConveyorTicker